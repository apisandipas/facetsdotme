import {
  Arvo,
  Lato,
  Poppins,
  Roboto,
  Roboto_Mono,
  Roboto_Slab,
} from "next/font/google";

const fontsAvailable = {
  Serif: ["Arvo", "Roboto Slab"],
  sep1: "sep",
  "Sans-serif": ["Lato", "Poppins", "Roboto Sans"],
  sep2: "sep",
  Monospaced: ["Roboto Mono"],
};

// Transform our font options datastructure into an array of font options

const arvo = Arvo({
  weight: "400",
  subsets: ["latin"],
});
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});
const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
const roboto_mono = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});
const roboto_slab = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const fonts = {
  Arvo: arvo,
  Lato: lato,
  Poppin: poppins,
  "Roboto Sans": roboto,
  "Roboto Mono": roboto_mono,
  "Roboto Slab": roboto_slab,
};

export const useGoogleFonts = () => {
  const getFontClassName = (fontName: string) => {
    return fonts[fontName]?.className;
  };
  return {
    arvo,
    lato,
    poppins,
    roboto,
    roboto_slab,
    roboto_mono,
    fonts,
    fontsAvailable,
    getFontClassName,
  };
};
