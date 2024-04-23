import {
  Input,
  Button,
  Select,
  Flex,
  Text,
  Stack,
  Box,
  Overlay,
  Group,
  Code,
  Image,
  useCombobox,
  Combobox,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconStarFilled,
  IconStarOff,
} from "@tabler/icons-react";
import { chevronSvg } from "../../../assets";
import { ApiSchedule } from "../../../requests/schedule";
import { useEffect, useRef, useState } from "react";
import { Links } from "../../../core/links";
import { group } from "console";
import { filter } from "lodash";

const languages = [
  {
    group: "",
    items: [
      {
        label: "English",
        value: "English",
        countryCode: "EN",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/gb.svg",
      },
      {
        label: "Spain",
        value: "Spain",
        countryCode: "ES",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/es.svg",
      },
      {
        label: "Germany",
        value: "Germany",
        countryCode: "DE",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/de.svg",
      },
      {
        label: "Ukrainian",
        value: "Ukrainian",
        countryCode: "UK",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/ua.svg",
      },
    ],
  },
  {
    group: " ",
    items: [
      {
        label: "Russian",
        value: "Russian",
        countryCode: "RU",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/ru.svg",
      },
    ],
  },
];

const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
  "🍇 Grapes",
  "🍋 Lemon",
  "🥬 Lettuce",
  "🍄 Mushrooms",
  "🍊 Oranges",
  "🥔 Potatoes",
  "🍅 Tomatoes",
  "🥚 Eggs",
  "🥛 Milk",
  "🍞 Bread",
  "🍗 Chicken",
  "🍔 Hamburger",
  "🧀 Cheese",
  "🥩 Steak",
  "🍟 French Fries",
  "🍕 Pizza",
  "🥦 Cauliflower",
  "🥜 Peanuts",
  "🍦 Ice Cream",
  "🍯 Honey",
  "🥖 Baguette",
  "🍣 Sushi",
  "🥝 Kiwi",
  "🍓 Strawberries",
];

const TurboSearchSelect = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const options = languages.map((group) => (
    <Combobox.Group label={group.group}>
      {group.items
        .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
        .map((el) => (
          <Combobox.Option value={el.value} key={el.value}>
            <Group gap="sm" style={{ "&:hover": { background: "#D1FD0A" } }}>
              <IconStarFilled size={12} />
              <Image w={15} h={15} src={`${Links.proDomain}${el.flagPath}`} radius="100%" />
              {el.label}
            </Group>
          </Combobox.Option>
        ))}
    </Combobox.Group>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
        middlewares={{ flip: true, shift: false }}
        offset={{ mainAxis: 10, crossAxis: 210 }}
      >
        <Combobox.Target withAriaAttributes={false}>
          <TextInput
            styles={{
              wrapper: {
                background: "none",
                minWidth: 240,
              },
              input: {
                background: "none",
              },
            }}
            component="div"
            style={{ marginBottom: 4 }}
            radius="lg"
            pointer
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            leftSectionWidth={110}
            leftSection={
              <Text size="sm" style={{ cursor: "pointer" }}>
                Translate to:
              </Text>
            }
            rightSection={
              <Image
                src={chevronSvg}
                onClick={() => combobox.openDropdown()}
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                style={{ cursor: "pointer" }}
              />
            }
            required
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            styles={{
              wrapper: {
                background: "none",
              },
              input: {
                position: "relative",
                zIndex: 100,
                background: "none",
              },
            }}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search..."
          />
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

//=======================================

// const SearchSelect = () => {
//   const combobox = useCombobox({
//     onDropdownClose: () => combobox.resetSelectedOption(),
//   });

//   const [value, setValue] = useState('');
//   const [filter, setFilter] = useState('');
//   const [search, setSearch] = useState('');

//   const shouldFilterOptions = !groceries.some((item) => item === value);
//   const filteredOptions = shouldFilterOptions
//     ? groceries.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
//     : groceries;

//   const options = languages.map(({items}) => items.map((el) => (
//     <Combobox.Option value={el.value} key={el.value}>
//         <Group gap="sm" style={{"&:hover": {background: "#D1FD0A"}}}>
//            <IconStarFilled size={12}/>
//            <Image w={15} h={15} src={`${Links.proDomain}${el.flagPath}`} radius="100%"/>
//            {el.label}
//          </Group>
//     </Combobox.Option>
//   )));

//   return (
//     <>

//     <Combobox
//       radius="lg"
//       onOptionSubmit={(optionValue) => {
//         setValue(optionValue);
//         combobox.closeDropdown();
//       }}
//       store={combobox}
//       withinPortal={false}
//       position="bottom"
//       middlewares={{ flip: true, shift: false }}
//       offset={{ mainAxis: 10, crossAxis: 171 }}
//     >
//       <Combobox.Target>
//         <TextInput
//           styles={{
//             wrapper: {
//               background: "none",
//               maxWidth: 240
//             },
//             input: {
//               background: "none"
//             }
//           }}

//           style={{marginBottom: 4}}
//           radius="lg"
//           pointer

//           value={value}
//           onChange={(event) => {
//             setValue(event.currentTarget.value);
//             combobox.openDropdown();
//             combobox.updateSelectedOptionIndex();
//           }}
//           onClick={() => combobox.openDropdown()}
//           onFocus={() => combobox.openDropdown()}
//           onBlur={() => combobox.closeDropdown()}

//           leftSectionWidth={110}

//           leftSection={
//             <Text size="sm">Translate to:</Text>
//           }

//           rightSection={
//             <Image
//               src={chevronSvg}
//               onClick={() => combobox.openDropdown()}
//               onFocus={() => combobox.openDropdown()}
//               onBlur={() => combobox.closeDropdown()}
//               style={{cursor: "pointer"}}
//             />
//           }
//           required
//         />
//       </Combobox.Target>

//       <Combobox.Dropdown
//         style={{
//           border: "none"
//         }}
//       >

//       <div style={{
//       width: 0,
//       height: 0,
//       position: "absolute",
//       top:-5,
//       left: 20,
//       borderLeft: "6px solid transparent",
//       borderRight: "6px solid transparent",
//       borderBottom: "6px solid #2E2E2E"
//     }}></div>
//         <Combobox.Options>
//         <Combobox.Search
//           value={search}
//           onChange={(event) => setSearch(event.currentTarget.value)}
//           variant="unstyled"
//           placeholder="Search..."
//         />
//           <Combobox.Header>
//             <TextInput
//               styles={{
//                 wrapper: {
//                   background: "none"
//                 },
//                 input: {
//                   position: "relative",
//                   zIndex: 100,
//                   background: "none"
//                 }
//               }}
//               variant="unstyled"
//               placeholder="Search..."
//               value={filter}  // value should be passed here
//               onChange={(event) => {
//                 setFilter(event.currentTarget.value);
//               }}
//             />
//           </Combobox.Header>
//           <ScrollArea.Autosize mah={200} type="scroll">
//             {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
//           </ScrollArea.Autosize>
//         </Combobox.Options>
//       </Combobox.Dropdown>
//     </Combobox>
//     </>
//     );

//   <Select
//   radius="lg"
//   placeholder="Translate to:"
//   component="input"
//   onChange={(country: string | null) => {
//     country && (setSelect(country));
//   }}
//   value={select}
//   renderOption={(el) => {
//     return (
//       <Group key={el.option.value} gap="sm" style={{"&:hover": {background: "#D1FD0A"}}}>
//         <IconStarFilled size={12}/>
//         <Image w={15} h={15} src={`${Links.proDomain}${el.option.flagPath}`} radius="100%"/>
//         {el.option.label}
//       </Group>
//       );
//     }}
//   comboboxProps={{ position: 'bottom-end', middlewares: { flip: false, shift: false }, offset: { mainAxis: 10, crossAxis: 120 } }}
//   data={languages}
//   style={{ width: 200, height: 40 }}
//   defaultValue={"English"}
//   required
// />

export const LinkInsertion = () => {
  const [select, setSelect] = useState("");

  useEffect(() => {
    // (async () => {
    //   const res = await ApiSchedule.getFilters();

    //   console.log(res);
    // })();

    console.log("Check Effect!");
  });

  useEffect(() => {
    console.log(select);
  }, [select]);

  return (
    <Flex gap={10}>
      <TurboSearchSelect />

      <Input
        radius="lg"
        component="input"
        styles={{
          wrapper: {
            padding: "0px",
            margin: "0px",
            top: 0,
            background: "none",
          },

          input: {
            background: "none",
          },

          section: {
            margin: "0px 5px",
            padding: "0px 5px",
            background: "none",
          },
        }}
        p={"0px"}
        wrapperProps={{ padding: "0px" }}
        placeholder={"Enter the link here..."}
        leftSectionWidth={110}
        leftSection={
          <Group
            gap="5px"
            p={"4.6px 14px 4.6px 6px"}
            m={"0px 10px 0px 0px"}
            style={{ borderRight: "1.5px solid #3C3C3C", position: "absolute", top: 0 }}
          >
            <IconBrandYoutube color="white" size={14} />
            /
            <IconBrandInstagram color="white" size={14} />
            /
            <IconBrandTiktok color="white" size={14} />
          </Group>
        }
        rightSection={
          <Button
            color="rgba(209, 253, 10, 1)"
            component="button"
            style={{ color: "black", position: "absolute", top: -1, cursor: "pointer" }}
          >
            Get Script
          </Button>
        }
        style={{ width: 665, height: 40 }}
      />
    </Flex>
  );
};
