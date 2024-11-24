import DocumentViewer from './DocumentViewer';
import QuestionCard from './QuestionCard';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { EmphCard } from '../components/Cards';
import ProgressUpdate from './ProgressUpdate';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


function QuestionForm(props) {
    const {
        theme,
        payload,
        currentValues,
        currentValuesSetter,
        currentScaledValues,
        currentScaledValuesSetter,
        currentHaveBeenSet,
        currentHaveBeenSetSetter,
        currentBlockId,
        currentBlockIdSetter,
        currentDefault,
        currentDefaultSetter,
        questionValid,
        questionValidSetter,
        commitLog,
        commitLogSetter,
        disabled = false,
    } = props;

    let conditionalComponent = (
        <EmphCard>
            <Typography variant="prompt" component="div">
                You have completed the question. Click the button below to submit your answers.
            </Typography>
            <Typography variant="highlightPrompt" component="div">
                Note: You can still resume annotation by unselecting "Nonsensical / Unreadable" or clicking on circle in the progress panel.
            </Typography>
            <FormGroup>
                <FormControlLabel control={
                    <Checkbox checked={!questionValid} onChange={(e) => questionValidSetter(!e.target.checked)} />
                } label="This question answer pair does not make sense or the document is unreadable."/>
            </FormGroup>
            <Box sx={{textAlign: "center"}}>
                <Button
                    variant="contained"
                    type="submit"
                    sx={{margin: "10px"}}
                >
                    Submit
                </Button>
            </Box>
        </EmphCard>
    );

    const linear = (x) => 2 * (x - 5000);
    // console.log(currentHaveBeenSet);

    if (questionValid && currentBlockId < payload.blocks.length) {
        conditionalComponent = (
            <QuestionCard
                claim={payload.claim}
                key={`question-card-${currentBlockId}`}
                currentBlockId={currentBlockId}
                currentBlockIdSetter={currentBlockIdSetter}
                currentValueSetter={(v) => {
                    let newValues = [...currentValues];
                    let newScaledValues = [...currentScaledValues];
                    let newHaveBeenSet = [...currentHaveBeenSet];
                    newValues[currentBlockId] = v;
                    newScaledValues[currentBlockId] = linear(v);
                    newHaveBeenSet[currentBlockId] = true;
                    // all haveBeenSet after the currentBlockId should be false,
                    // as new annotations should be made for the updated settings.
                    for (let i = currentBlockId + 1; i < payload.blocks.length; i++) {
                        newHaveBeenSet[i] = false;
                    }

                    currentValuesSetter(newValues);
                    currentScaledValuesSetter(newScaledValues);
                    currentHaveBeenSetSetter(newHaveBeenSet);
                    currentDefaultSetter(v);
                }}
                defaultValue={currentDefault}
                questionValid={questionValid}
                questionValidSetter={questionValidSetter}
                needExplanation={currentHaveBeenSet[currentBlockId]}
                commitLog={commitLog}
                commitLogSetter={commitLogSetter}
                scaleFunc={linear}
                disabled={disabled}
            />
        );
    }

    console.log(theme.palette.highlight.main);

    return (
        <Box>
            <DocumentViewer payload={payload} currentBlockId={currentBlockId} highlightColor={theme.palette.highlight.main} />
            {/* <ProgressBar progress={currentBlockId} numSteps={payload.blocks.length} /> */}
            {conditionalComponent}
            <ProgressUpdate
                theme={theme}
                blocks={payload.blocks}
                progress={currentBlockId}
                numSteps={payload.blocks.length}
                registeredValues={currentScaledValues.slice(0, currentBlockId)}
                currentBlockIdSetter={currentBlockIdSetter}
                currentValues={currentValues}
                currentDefaultSetter={currentDefaultSetter}
            />
        </Box>
    );
}

export default QuestionForm;