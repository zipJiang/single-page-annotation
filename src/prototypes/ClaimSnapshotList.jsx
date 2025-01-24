import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ClaimSnapshot from './ClaimSnapshot';


function ClaimSnapshotList(props) {
    const {
        theme,
        payload,
        subclaimIndex,
        setSubclaimIndex,
    } = props;

    const parentRef = useRef(null);

    return (
        <div style={{
            padding: "20px",
            height: `calc(90vh + 40px)`,
            overflow: "auto",
        }} ref={parentRef}>
            <Stack spacing={2}>
                {payload['sentence-subclaims'].map((subclaim, index) => {
                    return (
                        <Box key={"claim-snapshot" + index}>
                            <ClaimSnapshot
                                parentRef={parentRef}
                                theme={theme}
                                claim={subclaim}
                                isCurrent={index === subclaimIndex}
                                setSubclaimIndex={setSubclaimIndex}
                                index={index}
                            />
                        </Box>
                    );
                })}
            </Stack>
        </div>
    );
}

export default ClaimSnapshotList;