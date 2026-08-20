"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParam } from "@/hooks/use-search-param";
import { BadgeX, SearchIcon } from "lucide-react";
import { useRef, useState } from "react";

const SearchInput = () => {
  const [search, setSearch] = useSearchParam("search");

  const [value, setValue] = useState<string>(search);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        className="relative max-w-180 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(value);
          inputRef.current?.blur();
        }}
      >
        <Input
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#F0F4F8] rounded-full h-12 focus-visible:ring-0 focus:bg-white"
          placeholder="Search"
          type="text"
          name="search"
          id="search"
          value={value}
          onChange={handleSearch}
          ref={inputRef}
        />
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          className="absolute left-3 top-1/2 -translate-y-1/2 active:not-aria-[haspopup]:translate-y-[-50%] [&_svg]:size-5 rounded-full"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            type="reset"
            variant={"ghost"}
            size={"icon"}
            className="absolute right-3 top-1/2 -translate-y-1/2 active:not-aria-[haspopup]:translate-y-[-50%] [&_svg]:size-5 rounded-full"
            onClick={() => {
              setValue("");
              setSearch("");
              inputRef.current?.blur();
            }}
          >
            <BadgeX />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchInput;
