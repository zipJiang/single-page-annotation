import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { Chip } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckIcon from '@mui/icons-material/Check';
import DocumentViewer from "./DocumentViewer";
// import QuestionForm from "./QuestionForm";
import QuestionCard from "./QuestionCard";


export default function Instructions() {
    const pseudoPayload = [
        {
            blocks: [
                [
                    {content: "The final was a low scoring defensive affair which was edged by the host team.", highlight: false},
                    {content: "Earlier today, Ireland's Dublin Rebels had a comfortable 20-7 victory over French entrant, the Vileneuve d’Ascq Vikings to take 3rd place in the competition.", highlight: false},
                    {content: "The Rebels were defeated 24-14 by Brussels in Saturday’s semi-final – with the difference between the team being some uncharacteristic costly defensive errors by the Rebels.", highlight: false},
                    {content: "Hilversum defeated the Vikings 16-13 in the other semi-final.", highlight: false},
                    {content: "EFAF Atlantic Cup VI Results (all games played in Brussels, Belgium):", highlight: true},
                ]
            ],
            // question: "Where is the Atlantic Cup being held?",
            // answer: "Brussels, Belgium"
            claim: "The Atlantic Cup was held in Brussels, Belgium.",
        },
        {
            blocks: [
                [
                    {content: "ShinMaywa Industries is looking to progress a sale of the US-2 to Indonesia in 2017."},
                    {content: "Japanese company ShinMaywa Industries is moving forward with its potential programme to provide its US-2 amphibious search-and-rescue (SAR) aircraft to Indonesia, industry officials have told IHS Jane's at the Indo Defence 2016 exhibition in Jakarta.", highlight: false},
                    {content: "The programme features the initial supply of only three aircraft but has significance for Japan because it could represent the country's first major international defence sale since Tokyo lifted the country's long-standing ban on military exports in April 2014.", highlight: true},
                ],
                [
                    {content: "Masayuki Tanaka, the manager of ShinMaywa's amphibious aircraft export division, said on 3 November that although the US-2 is not equipped with any weapons or munitions, the aircraft is considered by the Japanese government as a defence product because it is operated by the Japan Self Defense Force.", highlight: false},
                    {content: "He added that ShinMaywa is hopeful that a contract to supply the aircraft to the Indonesian Armed Forces can be completed soon.", highlight: false},
                    {content: "At a government level Japan and Indonesia are continuing to discuss the US-2 export programme and we hope an agreement can be reached in 2017.", highlight: true},
                    {content: "Impetus in the US-2 sale to Indonesia was also provided by a defence collaboration deal signed by the two governments in March 2015 that outlines a commitment from both Indonesia and Japan to collaborate on military equipment and technologies.", highlight: true},
                ]
            ],
            // question: "What country has been concerned by Chinese military presence in the South China Sea?",
            // answer: "Indonesia"
            claim: "Indonesia has been concerned by Chinese military presence in the South China Sea."
        },
        {
            blocks: [
                [
                    {content: "Watchmaking company Vacheron Constantin is this year celebrating a quarter of a millennium of producing some of the world's most prestigious timepieces.", highlight: false},
                    {content: "This content was published on September 17, 2005 - 11:15", highlight: false},
                    {content: "Respected as one of the top addresses in horology, the Geneva company is looking back on a rich history of tradition and quality.", highlight: false},
                    {content: "But it is determined not to rest on its laurels.", highlight: false},
                    {content: "A tour around the state-of-the-art centre on the outskirts of Geneva reveals a world of wonder.",  highlight: false},
                    {content: "This is where master watchmakers put together the most complicated of watches that will more than likely gain in value as time goes by.", highlight: false},
                    {content: "History has a big value.", highlight: false},
                ]
            ],
            // question: "In which country was Jean-Marc Vacheron born?",
            // answer: "Switzerland"
            claim: "Jean-Marc Vacheron was born in Switzerland."
        }
    ]
    return (
        <Box sx={{padding: "20px"}}>
            <Typography variant="prompt" component="div">
                Welcome! Thank you for participating in this task. The purpose of this HIT is to estimate how well different parts of a given document <b>supports</b> a claim.
            </Typography>
            <Typography variant="prompt" component="div">
                In each HIT, you will be presented with a claim and a knowledge document that provides additional information to the claim. The document will be revealed to you chunk by chunk. We are particularly interested in how each chunk will update the level of support the document can provide to the claim. As the task is a bit complicated, we will walk you through the task step by step.
            </Typography>
            <Typography variant="prompt" component="div">
                When you finished reading the instruction, please click the <b>"QUESTIONS"</b> tab on the top left corner to start the task.
            </Typography>
            <Box>
                <Divider variant="middle" textAlign="center" sx={{borderWidth: "3px"}}>
                    <Chip label={"Detailed Instruction"}/>
                </Divider>
            </Box>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Box sx={{width: "80%", order: 1}}>
                    <List>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary='At the beginning of each HIT, you will be presented with a slider set to "uninformative."' />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary='On the top of the window the document will be gradually revealed to you chunk by chunk, with the newly introduced part bolded.' />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon> 
                            <ListItemText primary={<>To reduce your work we try to highlight the most relevent sentences, but those highlight can sometimes be wrong and we kindly ask you to <b>give your judgment after reading the whole revealed chunk.</b></>}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={'As you are shown new chunks of the document, consider how the newly introduced information updates the document\'s level of support for the claim.'} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary="Move the slider to the appropriate position to indicate your confidence in the answer given the newly introduced information." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={<>Note that your judgment should consider <b>all of the information in the document up to that point</b>, not just the new chunk in isolation.</>}/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary="When you are confident in your answer for a chunk, click on commit to proceed to the next chunk. Your latest annotation will be logged on the progress panel with a new light blue circle." />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={"After annotating all the chunks, a \"submit\" button will appear; click that to submit your HIT."} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={"It is possible that the claim does not make any sense, or the document seems completely Unreadable. In these cases please check the \"Nonsensical / Unreadable\" checkbox. Some documents contain hypertext information at the beginning, so you may want to look a couple more chunks before you confirm that this hit is unannotatable."} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={"In most cases, you don't want to change your annotation for previous chunks, even if new information in the present chunk suggests you should interpret sentences in previous chunks differently. In particular, you should only reannotate previous chunks if you are sure your previous annotation is an obvious mistake, e.g., a misplaced slider or missing critical information in the previous chunks. To reannotate previous chunks, click on the circle for previous chunk to go back. Notice that your annotation beyond that chunk will be cleared."} />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon><CheckIcon /></ListItemIcon>
                            <ListItemText primary={"When submitting updated annotations for previously annotated chunks, please provide an explanation in the \"explanation\" field describing why the changes were made."} />
                        </ListItem>
                    </List>
                </Box>
            </Box>
            <Divider variant="middle" textAlign="center" sx={{borderWidth: "3px"}}>
                <Chip label={"Example 1"}/>
            </Divider>
            <Box>
                <Box sx={{padding: "10px"}}>
                    <Typography variant="prompt">When it is possible to verify that the answer is correct given the document, you should place the slider at "Fully Supported."</Typography>
                </Box>
                <DocumentViewer
                    payload={pseudoPayload[0]}
                    currentBlockId={0}
                    disabled={true}
                />
                <QuestionCard
                    claim={pseudoPayload[0].claim}
                    currentBlockId={0}
                    currentBlockIdSetter={() => {}}
                    currentValueSetter={() => {}}
                    defaultValue={10000}
                    questionValid={true}
                    questionValidSetter={() => {}}
                    needExplanation={false}
                    commitLog={[]}
                    commitLogSetter={() => {}}
                    scaleFunc={(x) => x}
                    disabled={true}
                />
            </Box>
            <Divider variant="middle" textAlign="center" sx={{borderWidth: "3px"}}>
                <Chip label={"Example 2"}/>
            </Divider>
            <Box sx={{padding: "10px"}}>
                <Typography variant="prompt">Even if the answer isn't mentioned explicitly in the document, and seemingly no evidence in the document directly supports the answer. If by your commonsense judgment reading the document have raised your belief in the answer, you should still give a positive score (above "Uninformative").</Typography>
                <DocumentViewer
                    payload={pseudoPayload[1]}
                    currentBlockId={1}
                    disabled={true}
                />
                <QuestionCard
                    claim={pseudoPayload[1].claim}
                    currentBlockId={1}
                    currentBlockIdSetter={() => {}}
                    currentValueSetter={() => {}}
                    defaultValue={3503}
                    questionValid={true}
                    questionValidSetter={() => {}}
                    needExplanation={false}
                    commitLog={[]}
                    commitLogSetter={() => {}}
                    scaleFunc={(x) => x}
                    disabled={true}
                />
            </Box>
            <Divider variant="middle" textAlign="center" sx={{borderWidth: "3px"}}>
                <Chip label={"Example 3"}/>
            </Divider>
            <Box sx={{padding: "10px"}}>
                <Typography variant="prompt">If the document seems loosely relevant at one point, but isn't helpful answering the question in particular, leave the slider at "Uninformative" (as to indicate currently there aren't sufficient information in the document yet to eliminate your uncertainty).</Typography>
                <DocumentViewer
                    payload={pseudoPayload[2]}
                    currentBlockId={0}
                    disabled={true}
                />
                <QuestionCard
                    claim={pseudoPayload[2].claim}
                    currentBlockId={0}
                    currentBlockIdSetter={() => {}}
                    defaultValue={2500}
                    questionValid={true}
                    questionValidSetter={() => {}}
                    needExplanation={false}
                    commitLog={[]}
                    commitLogSetter={() => {}}
                    scaleFunc={(x) => x}
                    disabled={true}
                />
            </Box>
        </Box>
    )
}