import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import { applyProps } from './utils';


// Define a QuestionForm component that generate ta section containing all
// the input instances.

const EmphCard = applyProps(
    styled(Card)({
        margin: "15px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#b3e5fc"
    }),
    { elevation: 5 }
);

const NormalCard = applyProps(
    styled(Card)({
        margin: "5px",
        padding: "20px",
        borderRadius: "10px",
    }),
    { elevation: 5 }
)


export { EmphCard, NormalCard };