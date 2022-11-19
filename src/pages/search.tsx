import { Heading, Input, Link, List, ListItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSearch } from "../hooks/useSearch";

const Search = () => {
  const [search, setSearch] = useState("");
  const query = useSearch(search);

  return (
    <div>
      <Input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <List>
        {query.data?.results.map((resource) => (
          <ListItem key={resource.url}>
            <Heading size="md">{resource.title}</Heading>
            <Link href={resource.url}>{resource.url}</Link>
            <Text>{resource.description}</Text>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Search;
