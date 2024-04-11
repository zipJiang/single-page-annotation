
import { useDraggable } from '@dnd-kit/core';
import { NormalCard } from './Cards';
import Box from '@mui/material/Box';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';


function Draggable(props) {
    const {attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'draggable',
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Box sx={{ maxWidth: 500 }}>
            <div ref={setNodeRef}>
                <NormalCard style={style} {...listeners} {...attributes}>
                    Draggable Card
                </NormalCard>
            </div>
        </Box>
    );
}


function SortableItem(props) {

    // Important: the id here is the sortable id that can be used
    // so  it is the modified id from the original id
    const { id, content } = props;

    const {
        attributes,
        isDragging,
        isSorting,
        listeners,
        over,
        overIndex,
        setNodeRef,
        transition,
        transform
    } = useSortable({ id: id });

    const style = {
        transform: transform ? `translate3d(0px, ${transform.y}px, 0)` : undefined,
        transition,
        opacity: isDragging ? 0.5 : undefined,
    };

    return (
        <Box sx={{ maxWidth: 500, paddingBottom: "2px", margin: "0px" }} ref={setNodeRef}>
            <NormalCard style={style} {...listeners} {...attributes} sx={{marginLeft: "15px", marginRight: "15px"}}>
                {content}
            </NormalCard>
        </Box>
    )
}


export { Draggable, SortableItem };