import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { DndContext, MeasuringStrategy, MouseSensor, TouchSensor, closestCorners } from '@dnd-kit/core';
import Divider from '@mui/material/Divider';
import { Droppable } from './Droppable';
import { SortableContext, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CodeIcon from '@mui/icons-material/Code';
import { SortableItem } from './Draggable';
import { Typography } from '@mui/material';
import {
    closestCenter,
    pointerWithin,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from '@dnd-kit/modifiers';


function MultipleContainerContext(props) {

    const { contextId, data, items, setItems, setAlertOpen } = props;

    const sortingIdToContent = new Map(data.candidates.map((candidate) => [`${contextId}-${candidate["id"]}`, candidate["content"]]));

    const [activeFromContainer, setActiveFromContainer] = useState(null);
    const [activeFromIndex, setActiveFromIndex] = useState(null);

    // console.log(activeFromIndex);

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )

    const findContainer = (id) => {
        // This allows overId to be listId
        // or the id of the element inside the list

        if (id in items) {
            return id;
        }
    
        return Object.keys(items).find((key) => items[key].includes(id));
    };

    function handleDragStart(event) {
        setActiveFromContainer(findContainer(event.active.id));
        setActiveFromIndex(items[findContainer(event.active.id)].indexOf(event.active.id));
        setAlertOpen(false);
    }

    function handleDragEnd(event) {
        const { active, over } = event;

        const activeId = active.id;
        const overId = over?.id;

        if (overId === undefined || overId === null) {
            return ;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(activeId);

        if (overContainer) {
            const oldIndex = items[activeContainer].indexOf(activeId);
            const newIndex = items[activeContainer].indexOf(overId);

            if (oldIndex !== newIndex) {
                setItems((items) => ({
                    ...items,
                    [overContainer]: arrayMove(items[overContainer], oldIndex, newIndex),
                }));
            }
        }

        setActiveFromContainer(null);
        setActiveFromIndex(null);
    }

    function handleDragOver(event) {
        // console.log("called!");
        const { active, over } = event;
        const overId = over?.id;

        if (overId === undefined || overId === null) {
            return ;
        }

        // Since we only have two droppable(s),
        // We ca necessariliy assume that all droppable(s) are sortable
        // and valid.

        const activeContainer = findContainer(active.id);
        const overContainer = findContainer(over.id);

        if (!activeContainer || !overContainer) {
            return ;
        }

        if (activeContainer !== overContainer) {
            // console.log(overContainer);
            const oldIndex = items[activeContainer].indexOf(active.id);
            const overIndex = items[overContainer].indexOf(over.id);
            let newIndex = items[overContainer].length + 1;

            // But it could be below a certain already rendered instance
            if (overId in items) {
                newIndex = items[overId].length + 1;
                // newIndex = oldIndex;
            }
            else {
                const isBelowOverItem = 
                    over &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top >
                        over.rect.top + over.rect.height;

                const modifier = isBelowOverItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : items[overContainer].length + 1;
            }

            // But if the active container is the previous container
            // That we drag from, keep the index the same
            newIndex = activeFromContainer === overContainer ? activeFromIndex : newIndex;
            // console.log("items: ", items);

            setItems((items) => ({
                ...items,
                [activeContainer]: [
                    // ...items[activeContainer].slice(0, oldIndex),
                    // ...items[activeContainer].slice(oldIndex + 1),
                    ...items[activeContainer].filter((id) => id !== active.id),
                ],
                [overContainer]: [
                    ...items[overContainer].slice(0, newIndex),
                    active.id,
                    ...items[overContainer].slice(newIndex),
                ],
            }));
        }

        else if (activeFromContainer !== overContainer) {
            const oldIndex = items[activeContainer].indexOf(active.id);
            const overIndex = items[overContainer].indexOf(over.id);

            let newIndex = overIndex >= 0 ? overIndex : oldIndex;

            if (oldIndex !== newIndex) {
                setItems((items) => ({
                    ...items,
                    [overContainer]: arrayMove(items[overContainer], oldIndex, newIndex),
                }));
            }

            // console.log("activeFromContainer: ", activeFromContainer);
        }
    }

    return (
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <DndContext
                    sensors={sensors}
                    modifier={[restrictToParentElement, restrictToVerticalAxis]}
                    collisionDetection={pointerWithin}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    measuring={{
                        droppable: {
                            strategy: MeasuringStrategy.Always
                        }
                    }}
                >
                    <Box sx={{ width: '45%' }}>
                        <Paper sx={{height: "380px", padding: "20px", margin: "20px", borderRadius: "10px" }} elevation={3}>
                            <Typography variant="h6" component="div">
                                <CodeIcon /> Candidates
                            </Typography>
                            <Divider variant="middle" sx={{ margin: "10px" }}/>
                            <Box sx={{overflow: 'auto' }}>
                                <SortableContext items={items[`${contextId}-bank`]}>
                                    <Droppable id={`${contextId}-bank`}>
                                        {(items[`${contextId}-bank`]).map(id => (
                                            <SortableItem key={id} id={id} content={sortingIdToContent.get(id)} />
                                        ))}
                                    </Droppable>
                                </SortableContext>
                            </Box>
                        </Paper>
                    </Box>
                        <Box sx={{ width: '45%' }}>
                            <Paper sx={{height: "380px", padding: "20px", margin: "20px", borderRadius: "10px" }} elevation={3}>
                                <Typography variant="h6" component="div">
                                    <FormatListNumberedIcon/> Sorted
                                </Typography>
                                <Divider variant="middle" sx={{ margin: "10px" }}/>
                                <Box sx={{overflow: "auto"}}>
                                    <SortableContext items={items[`${contextId}-sorted`]}>
                                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
                                            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", order: 1}}>
                                                    <Box>
                                                        <Typography variant="tiny" component="div">
                                                            <KeyboardDoubleArrowUpIcon />
                                                            likely
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="tiny" component="div">
                                                            impossible
                                                            <KeyboardDoubleArrowDownIcon />
                                                        </Typography>
                                                    </Box>
                                            </Box>
                                            <Box sx={{ order: 2, width: "95%" }}>
                                                <Droppable id={`${contextId}-sorted`}>
                                                    {(items[`${contextId}-sorted`]).map(id => (
                                                        <SortableItem key={id} id={id} content={sortingIdToContent.get(id)} />
                                                    ))}
                                                </Droppable>
                                            </Box>
                                        </Box>
                                    </SortableContext>
                                </Box>
                            </Paper>
                        </Box>
                </DndContext>
            </Box>
    )
}


export default MultipleContainerContext;