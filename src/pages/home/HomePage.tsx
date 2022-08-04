import PageLayout from "@components/layouts/PageLayout";
import { useAxios } from "@contexts/AxiosContext";
import { Box, Typography } from "@mui/material";
import { ITree } from "@utils/models";
import { useEffect, useMemo, useState } from "react";
import { throttle } from "lodash";
import TreeView from "@components/tree/TreeView";

export default function HomePage() {
  const { getFamilyTree } = useAxios();
  const [data, setData] = useState<ITree[]>([]);

  const fetch = useMemo(
    () =>
      throttle(async (callback: (results: ITree[] | null) => void) => {
        const data = await getFamilyTree();
        callback(data);
      }, 200),
    [getFamilyTree]
  );

  useEffect(() => {
    fetch((data: ITree[] | null) => {
      if (data) setData(data);
    });
  }, [fetch]);

  return (
    <PageLayout pageTitle="Home" maxWidth={"lg"}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5">Family Tree</Typography>
        <TreeView data={data}></TreeView>
      </Box>
    </PageLayout>
  );
}
