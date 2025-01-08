import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import QuestionForm from './prototypes/QuestionForm';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lightPalette, darkPalette } from './components/themes';
import { useMediaQuery } from '@mui/material';


const lightTheme = createTheme({
  ...lightPalette,
  typography: {
    prevRead: {
      fontWeight: 'normal',
      color: "lightgrey",
      lineHeight: 2.0,
    },
    reading: {
      fontWeight: 'bold',
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    prompt: {
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    italicPrompt: {
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
      fontStyle: 'italic',
      textDecoration: 'underline',
    },
    highlightPrompt: {
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
      fontWeight: 'bold',
    },
    question: {
      fontWeight: 'bold',
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    answer: {
      fontWeight: 'bold',
      color: lightPalette.palette.black.main,
      lineHeight: 2.0,
    },
    progress: {
      fontSize: 12,
    },
    buttonText: {
      color: lightPalette.palette.white.main,
    }
  }
});


const darkTheme = createTheme({
  ...darkPalette,
  typography: {
    prevRead: {
      fontWeight: 'normal',
      color: "lightgrey",
      lineHeight: 2.0,
    },
    reading: {
      fontWeight: 'bold',
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    prompt: {
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    italicPrompt: {
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
      fontStyle: 'italic',
      textDecoration: 'underline',
    },
    highlightPrompt: {
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
      fontWeight: 'bold',
    },
    question: {
      fontWeight: 'bold',
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    answer: {
      fontWeight: 'bold',
      color: darkPalette.palette.black.main,
      lineHeight: 2.0,
    },
    progress: {
      fontSize: 12,
    },
    buttonText: {
      color: darkPalette.palette.white.main,
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

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = prefersDarkMode ? darkTheme : lightTheme;
  // const theme = lightTheme;
  // uncomment this for debugging

  const payload = JSON.parse(document.getElementById('payload-read').textContent);

  // const payload = {
  //   "meta": {
  //     "id": "zeGXjQYhXz",
  //     "review_idx": 0,
  //     "title": "Title: Video-Text Retrieval by Supervised Sparse Multi-Grained Learning\nAbstract: While recent progress in video-text retrieval has been advanced by the exploration of better representation learning, in this paper, we present a novel multi-grained sparse learning framework, S3MA, to learn an aligned sparse space shared between the video and the text for video-text retrieval. The shared sparse space is initialized with a finite number of sparse concepts, each of which refers to a number of words. With the text data at hand, we learn and update the shared sparse space in a supervised manner using the proposed similarity and alignment losses. Moreover, to enable multi-grained alignment, we incorporate frame representations for better modeling the video modality and calculating fine-grained and coarse-grained similarities. Benefiting from the learned shared sparse space and multi-grained similarities, extensive experiments on several video-text retrieval benchmarks demonstrate the superiority of S3MA over existing methods.",
  //     "claims": [
  //         "Claim1: We argue that learning a shared aligned space with supervision is a promising way to improve video-text retrieval.",
  //         "Claim2: This shared sparse space design not only improves the performance on VTR, but also allows us to interpret what the models have learned.",
  //         "Claim3: The sparse aligned space, as shown in Figure 5, enables the model to accurately capture the key concepts, resulting in improved alignment within the sparse space.",
  //         "Claim4: Finally, to evaluate the effectiveness of our proposed S3MA, we conducted experiments on three video-text benchmarks (Chen and Dolan, 2011; Fabian Caba Heilbron and Niebles, 2015; Xu et al., 2016).",
  //         "Claim5: Benefiting from multi-grained and multispace similarity, our proposed S3MA outperforms previous methods on all the benchmarks without requiring any additional data during training.",
  //         "Claim6: However, due to the unsupervised design, concepts in DiscretCodebook and VCM are either randomly initialized or updated unsupervisedly, which limits the potential of aligned sparse space.",
  //         "Claim7: On the other hand, OA-Trans and TABLE only employ a limited number of concepts to serve as the input of the text encoder to encourage alignment.",
  //         "Claim8: Meanwhile, these methods only perform the coarse-grained video-text similarity, lacking the fine-grained contrast between different modalities.",
  //         "Claim9: In comparison, our proposed S3MA learn the aligned sparse space containing a large number of words in a supervised manner, under the supervision of text, and calculate frame-sentence similarity for multi-space multi-grained alignment.",
  //         "Claim10: To show the empirical efficiency of our S3MA, we train it on MSR-VTT (Xu et al., 2016), MSVD (Chen and Dolan, 2011), and ActivityNet (Fabian Caba Heilbron and Niebles, 2015).",
  //         "Claim11: As shown in Table 1, S3MA achieves the best R@1 on the text-to-video retrieval results using ViT-B/32 and ViT-B/16, outperforming the second-best method by 2 . 1 and 0 . 4 , respectively.",
  //         "Claim12: The performance of S3MA on the video-to-text retrieval task is also comparable with previous methods, achieving the best and second-best results on R@1 and R@5 using ViT-B/32.",
  //         "Claim13: Moreover, we notice that only 1 previous method using ViT-B/16 outperforms S3MA with ViT-B/32 on the text-to-video retrieval, demonstrating the effectiveness of S3MA.",
  //         "Claim14: Compared to DiscreteCodebook (Liu et al., 2022a), which aligns modalities in an unsupervised manner, S3MA outperforms DiscreteCodebook on every metric.",
  //         "Claim15: Meanwhile, S3MA also outperforms VCM (Cao et al., 2022), which constructs an aligned space with unsupervisedly clustered visual concepts, demonstrating the importance of supervising alignment in the sparse space.",
  //         "Claim16: This suggests that aligning modalities with fine-grained supervision is a promising approach to improving video-to-text retrieval performance.",
  //         "Claim17: S3MA achieves the best R@1 on text-to-video retrieval on two datasets compared to the previous methods.",
  //         "Claim18: Besides, with the shared sparse space and multi-grained alignment, S3MA also has the lowest MnR.",
  //         "Claim19: By replacing the embedding initialization with the semantic embedding, the retrieval performance of S3MA decreases, proving the superiority of embedding space over the semantic embedding space.",
  //         "Claim20: The results show that without clustering, R@5, R@10, and MnR on text-to-video retrieval and R@10 and MnR on video-to-text retrieval are improved.",
  //         "Claim21: S3MA with TE outperforms S3MA without TE, because it is able to better model the temporal relation among different frames in a video.",
  //         "Claim22: Besides, using a larger base model, such as ViT-B/16, further improves the performance of S3MA, as a larger base model typically has better representation learning abilities benefiting this retrieval task as well.",
  //         "Claim23: The retrieval results show the satisfactory performance of S3MA, benefiting from multi-space multi-grained similarity.",
  //         "Claim24: S3MA demonstrates precise identification of the color ( green ), objects ( bicycle ), and humans ( a man ), indicating its proficiency in capturing intricate details.",
  //         "Claim25: In this paper, to better align video and text modalities, we proposed a multi-space, multi-grained video-text retrieval framework, S3MA.",
  //         "Claim26: Finally, we conducted extensive experiments on three representative video-text retrieval benchmarks, showing the superiority of S3MA.",
  //         "Claim27: Our quantitative results, shown in Table 8, indicate that the use of MLPs decreases R@1 on text-to-video and video-to-text retrieval. This suggests that cosine similarity is more suitable for VTR.",
  //         "Claim28: The experimental results show that with the 'anchor', S3MA can better align different modalities as R@1, R@5, and R@10 on text-to-video retrieval and R@1 on video-to-text retrieval have greatly improved, indicating that the supervised (anchor-based) alignment is crucial for better performance of the model.",
  //         "Claim29: The results indicate that adding both losses simultaneously achieves the best performance on the MSR-VTT dataset. When using only one loss, the performance on text-to-video retrieval is comparable to the method without using both losses on text-to-video retrieval, but outperforms the method without the two losses on video-to-text retrieval. Specifically, when using two losses, R@1 on text-to-video retrieval and video-to-text retrieval is improved by 1.1 and 1.5, respectively. Additionally, all the other metrics, such as R@5 and R@10, are also improved, demonstrating the power of the two proposed losses in aligning different modalities in the shared sparse space.",
  //         "Claim30: The results of these experiments demonstrate that, even with varying settings of \u03b1 and \u03b2, the video-text retrieval performance remains consistent, indicating that the model is robust and not highly sensitive to these hyperparameters. This suggests that S3MA is able to achieve good performance across a wide range of settings for these hyperparameters, making it easy to adjust and optimize for specific use cases.",
  //         "Claim31: Notably, we observe a decrease in performance when incorporating word-level contrast in both dense and sparse spaces, indicating possible feature redundancy."
  //     ],
  //     "review": "Review: Reasons to reject: KNN clustering to find concepts given words, makes the approach biased towards the word embeddings of he up-stream models. It can be claimed that the success of the networks is mostly achieved by the initial words embeddings, before clustering.\nQuestions: 1- How this method can handle rare and frequent concepts?\n2- Is the cluster center selected as the representative?\n3- Is there a way to take advantage of the cooccurrence of cluster words?\n4- Why the Dense space similarity needed?\n\n"
  //   },
  //   "response": {
  //       "Weakness associated with claims": [
  //           {
  //               "Associated claims": [3, 5, 8],
  //               "Reasoning": "The review critiques the reliance on initial word embeddings and KNN clustering, suggesting potential biases towards upstream models and questioning the handling of rare and frequent concepts, cluster center selection, and the need for dense space similarity. However, it does not explicitly relate these concerns to insufficient evidence supporting any specific claims made in the paper, nor does it mention missing related work that could weaken certain claims.",
  //               "Label": "OTHER"
  //           }
  //       ]
  //   },
  //   "pdf": "openreview.net/pdf?id=zeGXjQYhXz",
  // };

  const [ratings, setRatings] = useState(new Array(payload.meta.claims.length).fill(0));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        padding: "30px",
        width: "100%",
      }}>
        <QuestionForm
          theme={theme}
          payload={payload} 
          ratings={ratings}
          setRatings={setRatings}
        />
      </Box>

      <Box sx={{
          display: "none"
      }}>
          <input type="hidden" name="ratings" value={JSON.stringify(ratings)} />
      </Box>
    </ThemeProvider>
  );
}

export default App;