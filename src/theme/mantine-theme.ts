import { Button, createTheme, Flex, Input, TextInput, Tooltip } from "@mantine/core";

export const mantineTheme = createTheme({
  fontFamily: "Montserrat",
  fontFamilyMonospace: "Inconsolata",
  headings: { fontFamily: "Montserrat" },
  primaryColor: "lime",
  colors: {
    lime: [
      "#F4FCE3",
      "#E9FAC8",
      "#D8F5A2",
      "#C0EB75",
      "#d1fd0a",
      "#94D82D",
      "#82C91E",
      "#74B816",
      "#66A80F",
      "#5C940D",
    ],
  },
  components: {
    Flex: Flex.extend({ defaultProps: { align: "center" } }),
    Button: Button.extend({ defaultProps: { radius: 30 } }),
    Input: Input.extend({
      defaultProps: { radius: 0 },
      styles: {
        input: {
          fontSize: "var(--mantine-font-size-sm)",
          backgroundColor: "var(--mantine-color-dark-7)",
        },
      },
    }),
    InputWrapper: Input.Wrapper.extend({
      styles: {
        label: { fontSize: "var(--mantine-font-size-xs)", fontWeight: 600 },
        error: { fontSize: "var(--mantine-font-size-xs)" },
      },
    }),
    TextInput: TextInput.extend({ defaultProps: { radius: 0 } }),
    Tooltip: Tooltip.extend({ defaultProps: { withArrow: true, position: "top", openDelay: 200 } }),
  },
});
