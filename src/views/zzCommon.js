// (?<!\\)\\(\\d|w|s|d|b|c|f|n|r|t|v|n|xhh|uhhhh)
// \\\\$1
export default [
  {
    code: "8cbea27f-c4c5-4d11-a509-6a622ba01107",
    heng: [
      ".*H.*H.*",
      "(DI|NS|TH|OM)*",
      "F.*[AO].*[AO].*",
      "(O|RHH|MM)*",
      ".*",
      "C*MC(CCC|MM)*",
      "[^C]*[^R]*III.*",
      "(...?)\\1*",
      "([^X]|XCC)*",
      "(RR|HHH)*.?",
      "N.*X.X.X.*E",
      "R*D*M*",
      ".(C|HH)*",
    ],
    zuoxie: [
      ".*SE.*UE.*",
      ".*LR.*RL.*",
      ".*OXR.*",
      "([^EMC]|EM)*",
      "(HHX|[^HX])*",
      ".*PRR.*DDC.*",
      ".*",
      "[AM]*CM(RC)*R?",
      "([^MC]|MM|CC)*",
      "(E|CR|MN)*",
      "P+(..)\\1.*",
      "[CHMNOR]*I[CHMNOR]*",
      "(ND|ET|IN)[^X]*",
    ],
    youxie: [
      ".*G.*V.*H.*",
      "[CR]*",
      ".*XEXM*",
      ".*DD.*CCM.*",
      ".*XHCR.*X.*",
      ".*(.)(.)(.)(.)\\4\\3\\2\\1.*",
      ".*(IN|SE|HI)",
      "[^C]*MMM[^C]*",
      ".*(.)C\\1X\\1.*",
      "[CEIMU]*OH[AEMOR]*",
      "(RX|[^R])*",
      "[^M]*M[^M]*",
      "(S|MM|HHH)*",
    ],
  },
  {
    code: "59e565c95008d",
    heng: [
      "(X|Y|Z).*\\1.*\\1",
      "[^XYZ]*[XYZ]*",
      "(.).*(.).*\\2.*\\1",
      "[^X]*X+[^X]*",
      "([^X]|XXY)*",
      "[ABCD]*YO[EFGH]*",
      "[^RX](R|XX)*",
      "(...?)\\1*",
      ".*Y.*Z+",
    ],
    zuoxie: [
      ".*RZ.*",
      "(HY|RM|FX|EH)*",
      "X*F.*G.*H.*",
      "Y.*N.*",
      "(XX|YY|ZZ)*[XYZ]{2}.",
      "(.)(.).*\\1.*\\2.*\\2\\1",
      "[BMX]*",
      "[^DB]*DB[^DB]*",
      "[^A]B[^C]D[^E]",
    ],
    youxie: [
      "[^ABE]*BE[^ABE]*Z.*",
      ".*[BD]+",
      "[^A]*A[^A]*",
      ".*MM.*",
      "[^XO]*XO[^XO]*OX[^XO]*(.)\\1",
      "(.+).*\\1",
      ".*X.X.X.*",
      "H+(..)\\1.*",
      ".*(MR|CH|RF)[^X]*",
    ],
  },
  {
    code: "56a7569259530",
    heng: [
      "(?!.*(.).*\\1.*)(?=^[AOUTY\\s]+$)[^\\s].*[UO]*\\W.+A.*",
      ".*E.*\\W.*O.*E.*S",
      "(?=^[OELHT\\s]+$)^(\\W)H..\\w.*\\1.*H.*",
      "(?!.*(\\w).*\\1.*)(?=^[AEOHRSW\\s]+$)^E\\W.*\\W.*",
      "(?=^[ABDEGIRT\\s]+$)(.)\\1.*\\W.*\\W.",
      "(?!.*L.*).*(D),\\s.*\\1EE.\\s.*",
      "(?!.*(\\w).*\\1.*)(?=^[AIUNSTY,\\s]+$)[UO]*\\W.*A.*\\W.*",
      "\\s.*LL\\s.*[EFW]..",
      "D.*LA.*D\\s",
      "(?!.*(\\w).*\\1.*)(?=^[IOUHY\\s]+$).*[UO]*\\W.*H.*",
      "(?!.*(.).*\\1.*)(?=^[EOHTW\\s]+$)[UO].*\\W.*H.*",
    ],
    zuoxie: [
      "(?!.*(.).*\\1.*)(?=^[EOHN,\\s]+$).*",
      "(?!.*(.).*\\1.*)(?=^[AODHNY\\s]+$).*",
      "(?=^.{3}\\w+$)(?!.*(\\w).*\\1.*)(?=^[AIUNWT\\s]+$).*",
      "(?!.*(\\w).*\\1.*)(?=^[ADHOPR\\s]+$).*",
      ".T.(E)\\1\\w.*",
      "(?=^[AELORW\\s]+$)(.)(.).*\\2\\1.*",
      "(?=^[EIODT\\s]+$).*(T)(O)(E).*\\2.*\\1.*(I).*\\3.*\\4.*",
      "(?!.*(\\w).*\\1.*)(?=^[DGHLSPT\\s]+$).*H.*S\\S.",
      "(?!.*(\\w).*\\1.*)(?=^[IOUS,\\s]+$).*U\\W\\w.*I.*",
      "(?!.*(.).*\\1.*)(?=^[EOUBDH\\s]+$).*[UO]*\\W.*B.*",
      "(?!.*(.).*\\1.*)(?=^[EBKNY\\s]+$).*K*\\W.*E.*",
    ],
    youxie: [
      "(?!.*(.).*\\1.*)(?=^[IOUDN\\s]+$)[UO].*\\W.*N.*",
      "(?!.*(\\w).*\\1.*)(?=^[BDEPW\\s]+$)W.*[E]*\\W.*B.*",
      "(?!.*(.).*\\1.*)(?=^[BEIRSY,\\s]+$)\\sY.*,.*B.*",
      "(?=^[IOLT\\s]+$)T\\S.*LLT.*\\S.{2}",
      "(?=^[ADULHKST]+$).*H.*A.*A.*H.*",
      "(E).*\\1.*\\1.*",
      "^H.*(\\s).*[PYR].[LQY]\\1O$",
      "(?!.*([^E]).*\\1.*)(?=^[EIOUGPW\\s]+$).*E.*E.*U.*",
      "(?=^[ODN\\s]+$)(N)\\1\\s\\w\\s{2}.*",
      "(?!.*([^T]).*\\1.*)(?=^[ETRY\\s,]+$).*Y.*",
      "(?!.*\\s.*).*(A).*\\1.*\\1",
    ],
  },
  {
    code: "56beaa3fe8813",
    heng: [
      "(?!.*(.).*\\1)[CS2>O]*",
      "(?!.*(.).*\\1)[EDLR\\s=]*",
      "(?!.*(.).*\\1)[1IOT'\\s-]*",
      "(?!.*(.).*\\1)[EKS0-1'()]*",
      "(?!.*(.).*\\1)[LIFW2();\\s]*",
      "(?!.*(.).*\\1)[INOS1-2'\\s]*",
      "(?!.*(.).*\\1)[DEL2,\\s-]*",
      "(?!.*(.).*\\1)[ADRW,']*",
      "(?!.*([^']).*\\1)[DOW']*",
    ],
    zuoxie: [
      "[^);][^NOS].*",
      "[^0][^IL][^NO].*",
      "[^I].*",
      "[^LR]\\W.*(\\w)\\1[^AW]\\w$",
      ".(.).*\\1.\\w$",
      "(\\w)\\W\\1.{3}\\W\\w",
      "[^S].[^'-][^'(].*[^,]$",
      ".[^R].[^K].*",
      "\\W\\w\\W\\w\\W",
    ],
    youxie: [
      "[^D]\\w\\W\\w[^)]",
      ".[^A].[^N][^I][^KS]",
      "\\W\\w{2}\\d\\w{2}.*",
      "(\\W)\\1(\\w)\\W\\2\\W\\w.*",
      "(\\w)(\\w)\\2\\w\\1\\w\\W\\w.*",
      "\\W[^E](\\W)\\W\\1\\w\\W\\d",
      "(.)\\w\\1\\W\\d\\1.*",
      "\\w{2}\\d[^-]\\w.*",
      "\\W\\d\\w{3}",
    ],
  },
  {
    code: "56bc4e4991f83",
    heng: [
      "([^.])\\1+(\\S)\\2",
      "([^.])\\1+(\\S)\\2\\W",
      "([^.])\\1+\\w{2}\\W\\1+",
      "([^.])\\1+(\\S)\\2\\w\\1+",
      "([^.])\\1+(\\S)\\2\\S\\1+",
      "(?!^(.)\\1.*)(\\S)(\\S)\\w\\2\\W([^.])\\4\\W\\4+",
      "(?!^(.)\\1.*)(\\S)(\\S)\\w\\2\\W([^.])\\4+",
      "(?!^(.)\\1.*)(\\S)(\\S)\\W\\2\\W([^.*])\\4\\3\\4+",
      "([^.])\\1+(\\S)\\2\\S\\1+",
      "([^.])\\1+(\\S)\\2\\w\\1+",
      "([^.])\\1+\\w{2}[^\\s*]\\1+",
      "([^.])\\1+\\S{3}",
      "([^.])\\1+(\\S)\\2",
    ],
    zuoxie: [
      "[.\\s^]+",
      "[.*\\s]+",
      ".{5}([\\sE])\\1.*",
      ".{7}[\\sG].*",
      "\\s.*",
      "(\\S)(\\S)\\w\\1\\W{3}\\2\\W+",
      "(?!^(.)\\1.*)(\\S)(\\S)\\w\\2\\3\\W+",
      "(\\S)(\\S)\\w\\1\\2\\W{2}\\2\\W+",
      ".{5}(.)\\1.*",
      ".{7}[^*E\\s].*",
      ".{5}[^EB].*",
      ".*(.)\\1.$",
      "(.)\\1{4}[\\s.]+",
    ],
    youxie: [
      "[.\\s]+",
      "[.*\\s]+",
      "[!*E\\s]+",
      ".{7}[BER\\s!].*",
      ".{5}([AB*])\\1.*",
      "(?!^(.)\\1.*)([^\\s*])(\\S)\\w\\2\\3\\W{2}\\W+",
      "(?!^(.)\\1.*).*",
      "(?!^(.)\\1.*)[^\\s.](\\S)\\w\\2\\W{2}\\W+",
      ".{5}(.)\\1.*",
      ".{7}[!\\sG].*",
      ".{5}[!\\sX][!\\sP].*",
      "[.*\\s]+",
      "[.\\s]+",
    ],
  },
  {
    code: "5688f397e5d6c",
    heng: [
      "[A-G](.)[L-Z](\\1)",
      '(?=.*U.*)[^"BARG"]+',
      "[TIME|SR]+",
      "(TE|EP|TH|A)+",
      "(WE|O)+[FOR]+",
      "(FO|E|TH)+",
      "R?[A-E]{2}\\W",
    ],
    zuoxie: [
      ".*\\!",
      "[MZ](E)[OF]+\\1",
      "\\w[ACID]\\w+",
      "\\w[DTG]{2}\\w+",
      "(.)(\\1)(WT|SE)+",
      "[AEIOUT]+",
      '[RTD]+["BA"]+',
    ],
    youxie: [
      "[^BEFW]+",
      "C\\w{3}[^T]",
      "(.)(\\1)+[^D]",
      "\\W[EFG][RUST]+\\w",
      "(.)(\\1)[^E]+(\\1)",
      "[A-I]{4}N",
      "(E|PM)+O",
    ],
  },
  {
    code: "5699d21c55c41",
    heng: [
      "(?!^..\\\\)(?!^.\\.)\\\\([\\s.])([\\\\.])\\2{2}\\1\\/.*",
      ".+",
      ".+",
      "(.)\\1.*",
      "(.)\\1{2}\\W{5}\\1{3}.*",
      "(.)\\1{4}..\\1{5}.*",
      "(.)\\1{5}\\W\\1{6}.*",
      "(.)\\1{4}..\\1{5}.*",
      "(.)\\1{2}\\W{5}\\1{3}.*",
      "(.)\\1.*",
      ".+",
      ".+",
      ".+",
    ],
    zuoxie: [
      "-.*",
      ".+",
      "(\\.).{3}\\1.{3}\\1",
      "(.)\\1.*",
      "(.)\\1{2}\\W{5}\\1{3}.*",
      "(.)\\1{4}..\\1{5}.*",
      "(?=^.{6}\\|)^(.)\\1{5}\\W\\1{6}.*",
      "(.)\\1{4}..\\1{5}.*",
      "(.)\\1{2}\\W{5}\\1{3}.*",
      ".{2}(.).\\1.*",
      ".+",
      ".+",
      ".*",
    ],
    youxie: [
      ".*",
      ".+",
      ".+",
      "(.)\\1.*",
      "(.)\\1{2}\\W{5}\\1{3}.*",
      "(.)\\1{4}..\\1{5}.*",
      "(?=^.{6}\\|)^(.)\\1{5}\\W\\1{6}.*",
      "(.)\\1{4}..\\1{5}.*",
      "(.)\\1{2}\\W{5}\\1{3}.*",
      "(.)\\1.*",
      ".+",
      ".+",
      ".+",
    ],
  },
  {
    code: "5a7ed792493c1",
    heng: [
      ".?(FN|SN|EF|VN|VS|FS|NE)+",
      "([BISON])[A-E](\\W)\\d\\2",
      "[TREES]{4}[5-9]*[2-4]*",
      "[A-E]{2,3}[F-S]+\\d+",
      "([FUN]+)([D-F])\\2(1|2|4|9)\\3",
      "[FIVE]+(?=[^2-4]{2})[1-5]+",
      "(T?W?I?NK?Y?)+",
    ],
    zuoxie: [
      "[0-1]?[1-2]?[2-3]?[3-4]?[4-5]?[5-6]?.",
      "[4-6]{2,3}[0-2]+[NEW]+",
      "[\\.\\-\\\\\\,][^3-7](?!.*(.).*\\1)[FERN]*",
      "((.)(3))((\\2)(.))((.)([MICRO]))(\\9)",
      "[FEVERS][\\*\\+\\.\\=][A-F]{2,5}",
      "[GC7ANTE]*",
      "(?!..[A-F].)[EFFORT]*",
    ],
    youxie: [
      "[WINNER]+",
      "[REFINERY]+",
      "([WET]F)+[TWO]{2}",
      "(N\\d?E){2}[^B-E]*",
      "[^2-4]{2}.*",
      "[^46-9]+[VISA]+",
      "[^1][^0-3].*",
    ],
  },
  {
    code: "5b7f363515f89",
    heng: [
      "(?=\\W\\d)(.).\\1",
      "(?!.*(.).*\\1.*).[[-_]*.",
      "(?=\\w\\W.*)(?!.*(.).*\\1)[\\040\\042\\043\\x42\\052]*",
      "^/.+\\D",
      "(?!.*(.).*\\1.*)[A-Z]*",
    ],
    zuoxie: [
      ".*\\x4b.*",
      ".*\\x4d",
      "(?=(^\\S{2}\\s.*))(?=(.*\\s\\S{2}$)).+",
      ".\\W*",
      "(?!.*(.).*\\1.*)[\\102^\\x25]*",
    ],
    youxie: [
      ".*\\x52.+",
      '(?=.(.)\\1.).*"+.*',
      "(?!.*(.).*\\1.*).'.[^\\[].",
      "(?!.*(.).*\\1.*)(\\x34|\\120|[*\\]])*",
      "(?!.*(.).*\\1.*)[\\x23-\\045]*",
    ],
  },
];
