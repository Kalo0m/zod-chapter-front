import { useEffect, useState } from "react";

import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Card,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Experiment, apiClient } from "./api";

function App() {
  const [experiments, setExperiments] = useState<Experiment[] | undefined>(
    undefined
  );
  const [selectedExperiment, setSelectedExperiment] = useState<
    Experiment | undefined
  >(undefined);
  useEffect(() => {
    (async () => {
      const experiments = await apiClient.getExperiments();
      setExperiments(experiments);
    })();
  }, []);

  if (experiments === undefined) {
    return "Loading ...";
  }
  if (experiments.length === 0) {
    return "No experiments 😥";
  }
  return (
    <>
      <TableContainer>
        <Table colorScheme="gray.300">
          <TableCaption>Experiment list</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Name</Th>
              <Th>Tags</Th>
              <Th>Nombre de tags</Th>
            </Tr>
          </Thead>
          <Tbody>
            {experiments.map((experiment) => (
              <Tr
                onClick={() => setSelectedExperiment(experiment)}
                cursor={"pointer"}
                key={experiment.id}
              >
                <Td>{experiment.id}</Td>
                <Td>{experiment.name}</Td>
                <Td>
                  {experiment.tags?.map((tag) => (
                    <Tag key={tag.name} mr={2} colorScheme={tag.color}>
                      {tag.name}
                    </Tag>
                  ))}
                </Td>
                <Td>{experiment.tags?.length ?? 0}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedExperiment && <ExperimentCard experiment={selectedExperiment} />}
    </>
  );
}

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  return (
    <Card color={"gray.400"} bg={"gray.700"} p={8}>
      <Flex mb={"16px"} gap={"16px"} alignItems={"center"}>
        <Heading as={"h2"} size={"lg"}>
          {experiment.name}
        </Heading>
        <Flex>
          {experiment.tags?.map((tag) => (
            <Tag h={2} key={tag.name} mr={2} colorScheme={tag.color}>
              {tag.name}
            </Tag>
          ))}
        </Flex>
      </Flex>
      <Text mb={"12px"}>{experiment.description}</Text>
      {experiment.group && (
        <Flex>
          <Text mr={"4px"}>Group : </Text>
          <Text fontWeight={"bold"}>{experiment.group.name.toLowerCase()}</Text>
        </Flex>
      )}
    </Card>
  );
}

export default App;
