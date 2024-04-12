import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import QuestionForm from './prototypes/QuestionForm';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Instructions from './prototypes/Instructions';


const theme = createTheme({
  palette: {
    primary: {
      main: '#42a4f5',
    },
    secondary: {
      main: '#ff4081',
    },
    "question-prompt": {
      main: '#0072B2',
    },
    "answer-prompt": {
      main: '#aa00d5',
    },
    "explanation-prompt": {
      main: '#008d4b',
    },
    "yesb": {
      main: '#42a4f5',
      secondary: '#0072B2',
      thirdary: '#005f8c',
      fourthary: '#004c66',
    },
    alerting: {
      main: '#ff0000',
    },
    white: {
      main: '#ffffff',
    },
  },
  typography: {
    prevRead: {
      fontWeight: 'normal',
      color: "lightgrey",
      lineHeight: 2.0,
    },
    reading: {
      fontWeight: 'bold',
      color: "black",
      lineHeight: 2.0,
    },
    prompt: {
      color: "black",
      lineHeight: 2.0,
    },
    highlightPrompt: {
      color: "black",
      lineHeight: 2.0,
      fontWeight: 'bold',
    },
    question: {
      fontWeight: 'bold',
      color: "black",
      lineHeight: 2.0,
    },
    answer: {
      fontWeight: 'bold',
      color: "black",
      lineHeight: 2.0,
    },
    progress: {
      fontSize: 12,
    }
  }
});


function allyProps(index) {
  return {
    id: `single-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}


function ButtonAppBar(props) {
  const { pageIdxSetter } = props;

  return (
    <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{
            flexGrow: 1,
            color: theme.palette.white.main,
          }}>
            HIT
          </Typography>
          <Button sx={{
            color: theme.palette.white.main,
            '&:hover': {
              backgroundColor: theme.palette.yesb.secondary,
            }
          }} onClick={(event) => pageIdxSetter(0)}>Instruction</Button>
          <Button sx={{
            color: theme.palette.white.main,
            '&:hover': {
              backgroundColor: theme.palette.yesb.secondary,
            }
          }} onClick={(event) => pageIdxSetter(1)}>Question</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}


function App() {

  // uncomment this for debugging
  const payload = {
    blocks: [
      [
        {content: "WeChat is a window into the future of the internet in many different ways.", highlight: false},
        {content: "There\u2019s more to this so-called \u201csuper app\u201d than messaging, food, cars, and payments.", highlight: false},
        {content: "The all-encompassing ambition of WeChat includes some of the most cutting-edge, quick-acting, and far-reaching censorship technology on earth.", highlight: false},
        {content: "New research from the University of Toronto\u2019s CitizenLab pulls the curtain back on how WeChat\u2019s real-time, automatic censorship of text and images is used to exert control over political discussion on topics ranging from international issues like the trade war with the US to domestic scandals like the disappearance of court documents in a 2018 dispute between two multibillion-dollar Chinese mining companies.", highlight: false},
      ],
      [
        {content: "All discussion is ultimately subject to the Chinese government\u2019s approval.", highlight: false},
        {content: "WeChat\u2019s censors face two types of challenges.", highlight: true},
        {content: "Big public posts on WeChat Moments, a public feature similar to Facebook\u2019s Timeline, are scrutinized and filtered by algorithms that can sometimes take over 10 seconds to run\u2014a glacial pace on social media.", highlight: true},
      ],
      [
        {content: "The image is then checked for visual similarity to other censored images.", highlight: false},
        {content: "So-called harmful content\u2014including anything about international or domestic politics deemed undesirable by the Chinese Communist Party\u2014will be sniffed out, removed from the conversation, and then added to that original hash index, which flags it for instant censorship from that moment onward.", highlight: true},
      ],
      [
        {content: "It\u2019s a self-reinforcing system that\u2019s growing with every image sent.", highlight: false},
        {content: "The latter systems are also used on WeChat\u2019s Moments to check and build the company\u2019s dynamic blacklist.", highlight: false},
      ],
      [
        {content: "The Chinese tech giant Tencent, which owns WeChat, is under \u201ca great deal of pressure\u201d from Beijing to implement effective censorship tech, says Adam Segal, the director of the digital and cyberspace policy program at the Council on Foreign Relations. \u201c", highlight: false},
        {content: "The Chinese firms are all responsible for content, and while they have relied on tens of thousands of human censors, they have also been developing new [machine learning] approaches to content take-downs.", highlight: true},
      ],
      [
        {content: "Inside of China, it is part of the larger trend under Xi Jinping of tightening controls on the Chinese internet and society more broadly.\u201d\n", highlight: false},
        {content: "WeChat is so pervasive in China that the prospect of getting suspended or banned can disrupt lives.", highlight: false},
        {content: "The app combines the features of Facebook, Uber, GrubHub, and more.", highlight: false},
        {content: "You can book doctor\u2019s appointments, pay utility bills, talk to professional contacts, or engage government services.", highlight: false},
        {content: "\u201cThis has really become a mega-app,\u201d says Sarah Cook, the senior research analyst for East Asia at the pro-democracy research group Freedom House. \u201c", highlight: true},
        {content: "It\u2019s really hard to function in modern Chinese society without using WeChat, and so the chilling effect is real.\u201d", highlight: true},
      ],
    ],
    claim: "WeChat uses algorithms to monitor content."
  };

  // let payload = JSON.parse(
  //   document.getElementById('payload-read').innerHTML
  // );

  // const [tabValue, setTabValue] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);

  // Thus we explicitly set the mapping between the 
  // currentValues and the current Scaled Values
  const [currentValues, setCurrentValues] = useState(Array(payload.blocks.length).fill(0));
  const [currentScaledValues, setCurrentScaledValues] = useState(Array(payload.blocks.length).fill(0));
  // Use this set of values to track whether this part of the question had been set
  const [currentHaveBeenSet, setCurrentHaveBeenSet] = useState(Array(payload.blocks.length).fill(false)); 
  const [currentBlockId, setCurrentBlockId] = useState(0);
  const [currentDefault, setCurrentDefault] = useState(5000);
  const [questionValid, setQuestionValid] = useState(true);
  const [commitLog, setCommitLog] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <ButtonAppBar pageIdxSetter={setPageIdx} />
      <Box sx={{paddingTop: "100px", display: "flex", flexDirection: "row", flexWrap: "wraps", alignItems: "stretch", justifyContent: "center", width: "100%"}}>
        {pageIdx === 0 && <Box paddingLeft="10px" paddingRight="10px" maxWidth="1024px" order={0}>
          <Instructions />
        </Box>}
        {pageIdx === 1 && <Box paddingLeft="10px" paddingRight="10px" maxWidth="1024px" order={0}>
          <QuestionForm
            payload={payload}
            currentValues={currentValues}
            currentValuesSetter={setCurrentValues}
            currentScaledValues={currentScaledValues}
            currentScaledValuesSetter={setCurrentScaledValues}
            currentBlockId={currentBlockId}
            currentBlockIdSetter={setCurrentBlockId}
            currentHaveBeenSet={currentHaveBeenSet}
            currentHaveBeenSetSetter={setCurrentHaveBeenSet}
            currentDefault={currentDefault}
            currentDefaultSetter={setCurrentDefault}
            questionValid={questionValid}
            questionValidSetter={setQuestionValid}
            commitLog={commitLog}
            commitLogSetter={setCommitLog}
          />
          <input type="hidden" id="position" name="position" value={JSON.stringify(currentValues)} />
          <input type="hidden" id="scaled" name="scaled" value={JSON.stringify(currentScaledValues)} />
          <input type="hidden" id="question-valid" name="question-valid" value={JSON.stringify(questionValid)} />
          <input type="hidden" id="commit-log" name="commit-log" value={JSON.stringify(commitLog)} />
        </Box>}
      </Box>
    </ThemeProvider>
  );
}

export default App;