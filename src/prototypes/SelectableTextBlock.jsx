import "./SelectableTextBlock.css";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { stepContentClasses, Typography } from "@mui/material";
import { NoEncryption } from "@mui/icons-material";

function tokenSpanIsSet(tokenSpan) {
  return (
    tokenSpan &&
    tokenSpan.length === 2 &&
    tokenSpan[0] !== -1 &&
    tokenSpan[1] !== -1
  )
}
function tokenIsInSpan(tokenIndex, tokenSpan) {
  return (
    tokenSpanIsSet(tokenSpan) &&
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
        selectedTokenSpan = null,
        bColor = null,
        variant = "body1",
        parentRef = null,
        disabled = false,
    } = props;

    const [dragStartTokenIndex, setDragStartTokenIndex] = useState(-1);
    const [dragLastTokenIndex, setDragLastTokenIndex] = useState(-1);
    const targetRef = useRef(null);

    useEffect(() => {
        if (targetRef.current) {
            // only scroll if parentRef is scrollable
            const isScrollable = parentRef && parentRef.current.scrollHeight > parentRef.current.clientHeight;
            if (isScrollable) {
                targetRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
            };
        }
    }, [tokens, selectedTokenSpan]);

    const Highlight = styled("span")(({ theme }) => ({
      display: 'inline-block',
      userSelect: 'none',
      backgroundColor: bColor,
      color: theme.palette.text.primary,
    }));

    const Text = styled("span")(({ theme }) => ({
      display: 'inline-block',
      userSelect: 'none',
      color: theme.palette.text.primary,
    }));

    const HighlightText = ({ text, selection }) => {
        if (!selection || !text.includes(selection)) {
            return <Typography variant={variant} component={"div"}>
                <b>{prefix}</b>
                {text}
            </Typography>;
        }
      
        // Split the text into three parts: before, the match, and after
        const parts = text.split(selection);
      
        return (
            <Typography variant={variant} component={"div"}>
                <b>{prefix}</b>
                {parts[0]}
                <Highlight 
                    ref={targetRef}
                    id="highlighted-review"
                >{selection}</Highlight>
                {parts[1]}
            </Typography>
        );
    };

    function spansToHighlight() {
      return tokenSpanIsSet(selectedTokenSpan)
        ? [selectedTokenSpan]
        : [];
    }

    function tokenIsHighlighted() {
      return tokens.map((_, tokenIndex) =>
        spansToHighlight().some((span) => tokenIsInSpan(tokenIndex, span))
      );
    }

    function leadingTextIsHighlighted() {
      return tokens.map((_, tokenIndex) =>
        spansToHighlight().some((span) =>
          tokenIsInSpanAfterStart(tokenIndex, span)
        )
      );
    }

    function selectedText() {
      return tokenSpanIsSet(selectedTokenSpan)
        ? tokens
            .slice(selectedTokenSpan[0], selectedTokenSpan[1] + 1)
            .join(" ")
        : null;
    }

    function textClass(isHighlighted) {
      return isHighlighted ? 'highlighted' : '';
    }

    function tokenClass(tokenIndex) {
      const isHighlighted = tokenIsHighlighted()[tokenIndex].length;
      return textClass(selectedCount);
    }

    function leadingTextClass(tokenIndex) {
      const isHighlighted = leadingTextIsHighlighted()[tokenIndex].length;
      return textClass(selectedCount);
    }

    function setDrag(startTokenIndex, lastTokenIndex) {
      setDragStartTokenIndex(startTokenIndex);
      setDragLastTokenIndex(lastTokenIndex);
    }

    function resetDrag() {
      setDrag(-1, -1);
    }

    function updateDrag(lastTokenIndex) {
      setDragLastTokenIndex(lastTokenIndex);
    }

    function onMouseEnter(tokenIndex) {
      if (
        tokenSpanIsSet(selectedTokenSpan) &&
        dragStartTokenIndex !== -1 &&
        dragLastTokenIndex !== -1
      ) {
        if (tokenIndex != dragLastTokenIndex) {
          onSelect({
            span: [
              Math.min(dragStartTokenIndex, tokenIndex),
              Math.max(dragStartTokenIndex, tokenIndex)
            ],
            text: selectedText(),
          });
        }
        updateDrag(tokenIndex);
      } else {
        resetDrag();
      }
    }

    function onMouseDown(tokenIndex) {
      setDrag(tokenIndex, tokenIndex);
      onSelect([tokenIndex, tokenIndex]);
    }

    function onMouseLeave() {
      if (
        !tokenSpanIsSet(selectedTokenSpan) ||
        dragStartTokenIndex === -1 ||
        dragLastTokenIndex === -1
      ) {
        resetDrag();
      }
    }

    const LeadingText = ({ tokenIndex, text }) => {
      const escapedText = text.replaceAll(" ", "&nbsp;");
      return leadingTextIsHighlighted()[tokenIndex]
        ? <Highlight>{escapedText}</Highlight>
        : <Text>{escapedText}</Text>;
      return (
        <span
        class={
          'd-inline-block user-select-none pe-none' + (
            disabled
              ? ''
              : 'pe-none'
          ) + leadingTextClass(tokenIndex)
        }
        >{ text.replaceAll(" ", "&nbsp;") }
        </span>
      );
    };

    const Token = ({ index, text }) => {
      const escapedText = text.replaceAll(" ", "&nbsp;");
      return tokenIsHighlighted()[index]
        ? <Highlight             onMouseEnter={() => onMouseEnter(index)}
        onMouseDown={() => onMouseDown(index)}
        onMouseLeave={onMouseLeave}>{escapedText}</Highlight>
        : <Text             onMouseEnter={() => onMouseEnter(index)}
        onMouseDown={() => onMouseDown(index)}
        onMouseLeave={onMouseLeave}>{escapedText}</Text>;
      return (
          <span
            class={
              'd-inline-block user-select-none position-relative' + (
                disabled
                  ? 'selectable-token'
                  : 'pe-none'
              ) + tokenClass(index)
            }
            onMouseEnter={() => onMouseEnter(index)}
            onMouseDown={() => onMouseDown(index)}
            onMouseLeave={onMouseLeave}
            >{ text.replaceAll(" ", "&nbsp;") }
          </span>
      );
    };

    useEffect(() => {
      function onMouseUp() {
        resetDrag();
      }
      document.addEventListener('mouseup', onMouseUp);
      return () => {
        document.removeEventListener('mouseup', onMouseUp);
      };
    }, [resetDrag]);

    return (
      <Box>
        {
          tokens.flatMap((token, tokenIndex) =>
            (
              tokenIndex >= 0
                ? [<LeadingText tokenIndex={tokenIndex} text=" " />]
                : []
            ).concat([<Token index={tokenIndex} text={token} />])
          )
        }
      </Box>
    );
}

export default SelectableTextBlock;