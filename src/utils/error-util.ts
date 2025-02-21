export const printErrorLog = (e: any) => {
  if (e instanceof Error) {
    console.log(e.message);
  } else {
    console.log("Unknown error:", e);
  }
};
