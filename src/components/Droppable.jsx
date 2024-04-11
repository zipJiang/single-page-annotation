import { useDroppable } from '@dnd-kit/core';


function Droppable(props) {
    const { id, width } = props;
    const {isOver, setNodeRef} = useDroppable({
        id: id,
    });

    const style = {
        height: "300px",
        width: width,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
}


export { Droppable };