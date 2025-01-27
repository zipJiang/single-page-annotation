import "./SelectableTextBlock.css";

import { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { Typography } from "@mui/material";

function tokenSpanIsNonEmpty(tokenSpan) {
  return (
    tokenSpan &&
    tokenSpan.length === 2 &&
    tokenSpan[0] !== -1 &&
    tokenSpan[1] !== -1
  )
}

function tokenIsInSpan(tokenIndex, tokenSpan) {
  return (
    tokenSpanIsNonEmpty(tokenSpan) &&
    tokenSpan[0] <= tokenIndex &&
    tokenSpan[1] >= tokenIndex
  );
}

function tokenIsInSpanBeforeEnd(tokenIndex, tokenSpan) {
  return (
    tokenIsInSpan(tokenIndex, tokenSpan) && tokenSpan[1] > tokenIndex
  );
}

function tokenIsInSpanAfterStart(tokenIndex, tokenSpan) {
  return (
    tokenIsInSpan(tokenIndex, tokenSpan) && tokenSpan[0] < tokenIndex
  );
}

function SelectableTextBlock(props) {
    const {
        tokens,
        onSelect,
        prefix = null,
        selectedTokenSpan = null,
        bColor = null,
        variant = "body1",
        parentRef = null,
        disabled = false,
    } = props;

    const dragStartTokenIndex = useRef(-1);
    const dragLastTokenIndex = useRef(-1);
    const targetRef = useRef(null);

    const spansToHighlight = tokenSpanIsNonEmpty(selectedTokenSpan)
      ? [selectedTokenSpan]
      : [];

    const firstHighlightedTokenIndex = tokens.findIndex((_, tokenIndex) =>
      spansToHighlight.some((span) => tokenIsInSpan(tokenIndex, span))
    );

    function tokenIsHighlighted(tokenIndex) {
      return spansToHighlight.some((span) => tokenIsInSpan(tokenIndex, span));
    }

    function leadingTextIsHighlighted(tokenIndex) {
      return spansToHighlight.some((span) =>
        tokenIsInSpanAfterStart(tokenIndex, span)
      )
    }

    function dragInProgress() {
      return (
        tokenSpanIsNonEmpty(selectedTokenSpan)
        && dragStartTokenIndex.current !== -1
        && dragLastTokenIndex.current !== -1
      );
    }

    function tokensForSpan(span) {
      return tokenSpanIsNonEmpty(span) ? tokens.slice(span[0], span[1] + 1) : [];
    }

    function textForSpan(span) {
      return tokenSpanIsNonEmpty(span) ? tokensForSpan(span).join(' ') : '';
    }

    function onSelectWrapper(span) {
      return onSelect(span, tokensForSpan(span), textForSpan(span));
    }

    function onMouseEnter(tokenIndex) {
      if (dragInProgress()) {
        if (tokenIndex != dragLastTokenIndex.current) {
          dragLastTokenIndex.current = tokenIndex;
          onSelectWrapper([
            Math.min(dragStartTokenIndex.current, tokenIndex),
            Math.max(dragStartTokenIndex.current, tokenIndex)
          ]);
        }
      } else {
        dragStartTokenIndex.current = -1;
        dragLastTokenIndex.current = -1;
      }
    }

    function onMouseDown(tokenIndex) {
      dragStartTokenIndex.current = tokenIndex;
      dragLastTokenIndex.current = tokenIndex;
      onSelectWrapper([tokenIndex, tokenIndex]);
    }

    function onMouseLeave() {
      if (!dragInProgress()) {
        dragStartTokenIndex.current = -1;
        dragLastTokenIndex.current = -1;
      }
    }

    const TextSpan = styled("span")(({ theme }) => {
      const baseStyle = {
        display: 'inline-block',
        userSelect: 'none',
        color: theme.palette.text.primary,
      };
      return disabled
        ? {...baseStyle, pointerEvents: 'none'}
        : baseStyle;
    });

    const LeadingText = ({ tokenIndex }) => {
      return <TextSpan
        sx={leadingTextIsHighlighted(tokenIndex) ? {backgroundColor: bColor} : {}}
      >
        &nbsp;
      </TextSpan>;
    };

    const Token = ({ tokenIndex, text }) => {
      return <TextSpan
        className="selectable-token"
        sx={tokenIsHighlighted(tokenIndex) ? {backgroundColor: bColor} : {}}
        ref={tokenIndex === firstHighlightedTokenIndex ? targetRef : null}
        onMouseEnter={() => onMouseEnter(tokenIndex)}
        onMouseDown={() => onMouseDown(tokenIndex)}
        onMouseLeave={onMouseLeave}
      >
        {text.replaceAll(" ", "&nbsp;")}
      </TextSpan>;
    };

    useEffect(() => {
      if (targetRef.current) {
        // only scroll if parentRef is scrollable
        const isScrollable = (
          parentRef
          && parentRef.current
          && parentRef.current.scrollHeight > parentRef.current.clientHeight
        );
        if (isScrollable) {
          targetRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
        };
      }
    }, [parentRef]);  // (Almost) empty dependencies: call just once, after initial render

    useEffect(() => {
      function resetDrag() {
        dragStartTokenIndex.current = -1;
        dragLastTokenIndex.current = -1;
      }
      document.addEventListener('mouseup', resetDrag);
      return () => {
        document.removeEventListener('mouseup', resetDrag);
      };
    }, []);  // Empty dependencies: call just once, after initial render

    return (
      <Box>
        <Typography variant={variant} component={"div"}>
          {prefix ? <b>{prefix}</b> : null}
          {
            tokens.flatMap((token, tokenIndex) => {
              const tokenElement = <Token key={`Token${tokenIndex}`} tokenIndex={tokenIndex} text={token} />;
              return tokenIndex >= 0
                ? [<LeadingText key={`LeadingText${tokenIndex}`} tokenIndex={tokenIndex} />, tokenElement]
                : [tokenElement];
            })
          }
        </Typography>
      </Box>
    );
}

export default SelectableTextBlock;