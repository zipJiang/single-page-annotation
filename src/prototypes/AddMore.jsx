import "./AddMore.css";
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import { candidateColorList } from './ckp';


function AddMore(props) {

    const {
        numAlreadyAdded,
        weaknessDescs,
        setNumAlreadyAdded,
        setWeaknessDescs,
        setBackgroundColors,
        setFocusIndex,
    } = props;

    return (
        <div className="add-more">
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 16, right: 16,  }}
                icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                onClick={() => {
                    // We'll add new weakness to the weakness list
                    setFocusIndex(weaknessDescs.length);
                    setWeaknessDescs((prev) => [...prev, 1]);
                    setBackgroundColors((prev) => [...prev, candidateColorList[numAlreadyAdded % candidateColorList.length]]);
                    setNumAlreadyAdded(numAlreadyAdded + 1);
                }}
            >
            </SpeedDial>
        </div>
    );
}

export default AddMore;