import "./Sliders.css";
import { Slider } from '@mui/material';
import styled, { slotShouldForwardProp } from '@mui/material/styles/styled';
import { SliderMark } from '@mui/material';


const plausibilityFormat = (num) => {
    return "P = " + (num * 100).toFixed(2) + "%";
}

//TODO: Modify this section to make it a callable higher order function by user
const sigmoidClosure = (beta, midValue) => {
    return function (v) {
        let normalized = beta * (v - midValue);

        if (normalized === 0)
            return 0.5;
        else if (normalized < 0)
            return Math.exp(normalized) / (1 + Math.exp(normalized));
        else
            return 1 / (1 + Math.exp(0 - normalized));
    };
}

const beta = 0.0005;
const midValue = 5000;

export const logitScale = (value) => {
    // Scale the value according to some slider bar changes

    // if the value is min max should directly return
    if (value === 0) return 0.;
    else if (value === 10000) return 1.;

    const sigmoidFunc = sigmoidClosure(
        beta,
        midValue
    );

    let transformed = sigmoidFunc(value);
    let minVal = sigmoidFunc(0);
    let maxVal = sigmoidFunc(10000);

    if (Math.abs(transformed - 0.5) < 1e-8)
        return 0.5;
    else if (transformed < 0.5)
        return 0.5 - (0.5 - transformed) / (1 - 2 * minVal);
    else
        return 0.5 + (transformed - 0.5) / (2 * maxVal - 1);
};

export const reverseLogit = (pla) => {
    // Given a plausibility, we want to reverse the logit scale
    const sigmoidFunc = sigmoidClosure(
        beta,
        midValue
    );
    let minVal = sigmoidFunc(0);
    let maxVal = sigmoidFunc(10000);

    if (pla === 0.5)
        return 5000;
    else if (pla < 0.5) {
        let unnormalized = 0.5 * (1 - (1 - 2 * pla) * (1 - 2 * minVal));
        return Math.log(unnormalized / (1 - unnormalized)) / beta + midValue;
    }
    else {
        let unnormalized = 0.5 * (1 + (2 *pla - 1) * (2 * maxVal - 1));
        return - Math.log((1 - unnormalized) / unnormalized) / beta + midValue;
    }
}


const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markLabelActive',
  overridesResolver: (props, styles) => styles.markLabel,
})(({ theme, ownerState, markLabelActive }) => ({
  ...theme.typography.body2,
  color: (theme.vars || theme).palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(ownerState.orientation === 'horizontal' && {
    top: 30,
    // transform: 'translateX(-50%)',
    '@media (pointer: coarse)': {
      top: 40,
    },
  }),
  ...(ownerState.orientation === 'vertical' && {
    left: 36,
    '@media (pointer: coarse)': {
      left: 44,
    },
  }),
  ...(markLabelActive && {
    color: (theme.vars || theme).palette.text.primary,
  }),
}));


function MarkLabelComponent(props) {

    const { children, className, ...others } = props;

    return (
        <SliderMarkLabel className={className} {...others}>
            {children}
        </SliderMarkLabel>
    )
}


const MySliderMark = styled(SliderMark)({
    transform: "translate(-1px, -50%) scale(3)"
})


// Create out own slider component
const MySlider = styled(Slider)({
  color: '#1976d2',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 20,
    backgroundColor: '#1976d2',
  },
  '& .MuiSlider-mark': {
    tranform: "translate(-1px, -50%) scale(3)",
  }
});


const markers = [
  {
    value: 0,
    label: <div className={"BottomLabel"}>Impossible</div>,
  },
  {
    value: parseInt(reverseLogit(0.1)),
    label: <div className={"TopLabel"}>Unlikely</div>,
  },
  {
    value: parseInt(reverseLogit(0.25)),
    label: <div className={"BottomLabel"}>Somewhat Unlikely</div>,
  },
  {
    value: parseInt(reverseLogit(0.75)),
    label: <div className={"TopLabel"}>Somewhat Likely</div>,
  },
  {
    value: parseInt(reverseLogit(0.9)),
    label: <div className={"BottomLabel"}>Likely</div>,
  },
  {
    value: 10000,
    label: <div className={"TopLabel"}>Certain</div>,
  },
];


export function LabeledSlider({
  name,
  setter,
  value,
  valueLabelDisplay = "on",
  valueLabelFormat = plausibilityFormat,
  defaultValue = 5000,
  disabled = false,
  min = 0,
  max = 10000,
  step = 1,
  marks = markers,
  slots = {markLabel: MarkLabelComponent, mark: MySliderMark},
  scale = logitScale,
  sx = {
    width: "70%",
    '& .MuiSlider-markLabel': {
      fontSize: "15px",
    },
  }
}) {

  return (
    <>
    <br />
    <br />
      <MySlider
        valueLabelDisplay={valueLabelDisplay}
        valueLabelFormat={valueLabelFormat}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        marks={marks}
        scale={scale}
        slots={slots}
        sx={sx}
        name={name}
        onChange={(event) => setter(event.target.value)}
      />
    </>
  );
}