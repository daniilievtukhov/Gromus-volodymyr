type PathParam<Path extends string> = Path extends `${infer L}/${infer R}`
  ? PathParam<L> | PathParam<R>
  : Path extends `:${infer Param}`
    ? Param
    : never;

export const generateLink = <Path extends string>(
  originPath: Path,
  params?: {
    [key in PathParam<Path>]: string | null;
  },
): string => {
  let path = originPath;

  Object.entries(params ?? {}).forEach(([key, value]) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    path = path.replaceAll(`:${key}`, value);
  });

  return path;
};
