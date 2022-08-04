import { Box } from "@mui/system";
import { INode, ITree } from "@utils/models";
import { useRef, useState, useEffect, useCallback } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";
import ReactDOM from "react-dom";
import TreeNode from "./TreeNode";

interface TreeViewProps {
  data: ITree[];
}

export default function TreeView({ data }: TreeViewProps) {
  const treeContainer = useRef();
  const [treeData, setTreeData] = useState<RawNodeDatum>();
  const [translate, setTranslate] = useState({ translateX: 0, translateY: 0 });
  const nodeSize = { x: 200, y: 82 };

  const getNode = useCallback(
    (id: number): INode | undefined => {
      const tree = data.find((x) => x.id === id);
      if (tree === undefined || tree === null) {
        return undefined;
      }

      const node: INode = {
        key: tree.id.toString(),
        name: tree.name,
        gender: tree.gender,
      };
      return node;
    },
    [data]
  );

  const mapNode = useCallback(
    (treeData: INode[], tree: ITree) => {
      const childrens = tree.children
        .map((c) => getNode(c))
        .filter((f) => f !== undefined)
        .map((c) => c as INode);

      // Find parent Links
      if (tree.parents.length > 0) {
        // All people have TWO and ONLY TWO parents
        const parent1 = tree.parents[0].toString();
        const parent2 = tree.parents[1].toString();
        const treep1 = treeData.find((t) => t.key === parent1);
        const treep2 = treeData.find((t) => t.key === parent2);

        if (treep1 && (!treep2 || (treep2 && !treep2.link))) {
          treep1.link = getNode(parseInt(parent2));
        }

        if (treep2 && (!treep1 || (treep1 && !treep1.link))) {
          treep2.link = getNode(parseInt(parent1));
        }
      }

      const node: INode = {
        key: tree.id.toString(),
        name: tree.name,
        gender: tree.gender,
        children: childrens,
      };

      if (childrens.length === 0) {
        node.link = {} as INode;
      }

      return node;
    },
    [getNode]
  );

  const getRawNode = useCallback(
    (processData: INode[], childId: string): RawNodeDatum | null => {
      const node = processData.find((value) => value.key === childId);
      if (node) {
        // Child Map
        const childrens = node.children
          ? (node.children
              .map((c) => getRawNode(processData, c.key))
              .filter((c: any) => {
                return c !== null;
              }) as RawNodeDatum[])
          : [];
        // Node map
        return {
          name: node.name,
          attributes: {
            isRoot: false,
            parentOneName: node.name,
            parentOneGender: node.gender,
            parentTwoName: node.link ? node.link.name : "",
            parentTwoGender: node.link ? node.link.gender : "",
          },
          children: childrens,
        };
      }

      return null;
    },
    []
  );

  const processData = useCallback(() => {
    const treeData: INode[] = [];
    if (data.length > 0) {
      // Map Tree data to Node with Links
      data.map((tree) => {
        const treep1: any = treeData.find(
          (t: any) => t.key === tree.id.toString()
        );
        if (!treep1) {
          const node = mapNode(treeData, tree);
          treeData.push(node);
          return node;
        }
        return undefined;
      });

      // Filter parents
      const processData = treeData.filter((f) => f.link);
      // Recursive node map
      // Top level parents will be parents who BOTH don't have parents
      const root = getRawNode(processData, processData[0].key);
      root && setTreeData(root);
    }
  }, [data, getRawNode, mapNode]);

  useEffect(() => {
    if (treeContainer) {
      const node = ReactDOM.findDOMNode(treeContainer.current) as Element;
      const { width, height } = node.getBoundingClientRect();
      setTranslate({
        translateX: width / 2,
        translateY: height / 16,
      });
    }
    processData();
  }, [treeContainer, processData]);

  return (
    <Box
      ref={treeContainer}
      sx={{
        height: "60vh",
      }}
    >
      {treeData && (
        <Tree
          data={treeData}
          orientation="vertical"
          translate={{ x: translate.translateX, y: translate.translateY }}
          pathFunc={"step"}
          renderCustomNodeElement={(props) => (
            <TreeNode
              height={nodeSize.y * 2}
              width={nodeSize.x / 2}
              x={-50}
              y={-10}
              nodeDatum={props.nodeDatum}
              toggleNode={props.toggleNode}
            />
          )}
          nodeSize={nodeSize}
        />
      )}
    </Box>
  );
}
