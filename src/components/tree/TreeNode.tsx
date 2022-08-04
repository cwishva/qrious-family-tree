import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { TreeNodeDatum } from "react-d3-tree/lib/types/common";
import { ReactComponent as Users } from "@assets/icons/users.svg";

interface TreeNodeProps {
  width: number;
  height: number;
  x: number;
  y: number;
  nodeDatum: TreeNodeDatum;
  toggleNode: () => void;
}

function TreeNode({
  nodeDatum,
  toggleNode,
  width,
  height,
  x,
  y,
}: TreeNodeProps) {
  const foreignObjectProps = {
    width: width,
    height: height,
    x,
    y,
  };

  function gender(gender?: string): string {
    switch (gender) {
      // People with gender of "male" should have background-color lightblue.
      case "male":
        return "#a4ecff";
      // People with a gender of "female" should have background-color lightpink
      case "female":
        return "#f9ceee";
      default:
        return "#0000";
    }
  }

  return (
    <g>
      {nodeDatum.attributes?.isRoot && (
        <circle r="5" x="-10" onClick={toggleNode} />
      )}
      <foreignObject {...foreignObjectProps} onClick={toggleNode}>
        {nodeDatum.attributes?.parentOneName && (
          <>
            <Box
              sx={{
                border: "1px solid black",
                backgroundColor: gender(
                  nodeDatum.attributes?.parentOneGender as string
                ),
                display: "flex",
                justifyContent: "space-evenly"
              }}
            >
              {/* Each box should contain the person’s name */}
              <Users width="16" height="16" />
              <Typography>{nodeDatum.attributes?.parentOneName}</Typography>
            </Box>
            {nodeDatum.attributes?.parentTwoName && (
              <Box
                sx={{
                  border: "1px solid black",
                  backgroundColor: gender(
                    nodeDatum.attributes?.parentTwoGender as string
                  ),
                  display: "flex",
                  justifyContent: "space-evenly",
                  mt: "1px",
                }}
              >
                {/* Each box should contain the person’s name */}
                {nodeDatum.attributes?.parentTwoName && (
                  <>
                    {" "}
                    <Users width="16" height="16" />
                    <Typography>
                      {nodeDatum.attributes?.parentTwoName}
                    </Typography>
                  </>
                )}
              </Box>
            )}
          </>
        )}
      </foreignObject>
    </g>
  );
}

export default React.memo(TreeNode);
