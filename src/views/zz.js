export default {
  heng: [
    ".*H.*H.*", // 7 NHPEHAS =============
    "(DI|NS|TH|OM)*", // 8 DIOMOMTH =============
    "F.*[AO].*[AO].*", // 9 FOXNXAXPH =============
    "(O|RHH|MM)*", // 10 MMOMMMMRHH =============
    ".*", // 11 MCXNMMCRXEM =============
    "C*MC(CCC|MM)*", // 12 CMCCCCMMMMMM =============
    "[^C]*[^R]*III.*", // 13 HRXRCMIIIHXLS
    "(...?)\\1*", // 12 OREOREOREORE =============
    "([^X]|XCC)*", // 11 VCXCCHHMXCC =============
    "(RR|HHH)*.?", // 10 RRRRHHHRRU =============
    "N.*X.X.X.*E", // 9 NCXDXEXLE =============
    "R*D*M*", // 8 RRDDMMMM =============
    ".(C|HH)*", // 7 GCCHHCC =============
  ],
  zuoxie: [
    ".*SE.*UE.*", // 7 SECUEMC =============
    ".*LR.*RL.*", // 8 MLRCRLMC =============
    ".*OXR.*", // 9 MMXOXRXMH =============
    "([^EMC]|EM)*", // 10 HEMHEMHEMH =============
    "(HHX|[^HX])*", // 11 HHXMIRHHXDC =============
    ".*PRR.*DDC.*", // 12 HPRRMIOHHDDC =============
    ".*", // 13 STXMCMIECRXRG =============
    "[AM]*CM(RC)*R?", // 12 AMAMMCMRCRCR =============
    "([^MC]|MM|CC)*", // 11 HOXMMCCOXRN =============
    "(E|CR|MN)*", // 10 EMNMNCRECR =============
    "P+(..)\\1.*", // 9 POXOXCXRV =============
    "[CHMNOR]*I[CHMNOR]*", // 8 HIOMCMRO
    "(ND|ET|IN)[^X]*", // 7 NDFMMCH =============
  ],
  youxie: [
    ".*G.*V.*H.*", // 7 GRNRVOH =============
    "[CR]*", // 8 CRCRCRRC =============
    ".*XEXM*", // 9 CDXRXEXMM =============
    ".*DD.*CCM.*", // 10 HDDRCORCCM =============
    ".*XHCR.*X.*", // 11 HMXHCRCCXMF =============
    ".*(.)(.)(.)(.)\\4\\3\\2\\1.*", // 12 CMEHHEMCNOOD =============
    ".*(IN|SE|HI)", // 13 CMXHHOICMMXIN =============
    "[^C]*MMM[^C]*", // 12 MLRMRIMMMNOH =============
    ".*(.)C\\1X\\1.*", // 11 ERXEIMCMXMP =============
    "[CEIMU]*OH[AEMOR]*", // 10 UCOHMRMAOE =============
    "(RX|[^R])*", // 9 CRXMXRXMH =============
    "[^M]*M[^M]*", // 8 ELMEHPTA =============
    "(S|MM|HHH)*", // 7 SMMHHHS =============
  ],
};

/**
 *       N H P E H A S
 *      D I O M O M T H
 *     F O X N X A X P H
 *    M M O M M M M R H H
 *   M C X N M M C R X E M
 *  C M C C C C M M M M M M
 * H R X R C M I I I H X L S
 *  O R E O R E O R E O R E
 *   V C X C C H H M X C C
 *    R R R R H H H R R U
 *     N C X D X E X L E
 *      R R D D M M M M
 *       G C C H H C C
 */

/**
 *             N   H   P   E   H   A   S
 *           D   I   O   M   O   M   T   H
 *         F   O   X   N   X   A   X   P   H
 *       M   M   O   M   M   M   M   R   H   H
 *     M   C   X   N   M   M   C   R   X   E   M
 *   C   M   C   C   C   C   M   M   M   M   M   M
 * H   R   X   R   C   M   I   I   I   H   X   L   S
 *   O   R   E   O   R   E   O   R   E   O   R   E
 *     V   C   X   C   C   H   H   M   X   C   C
 *       R   R   R   R   H   H   H   R   R   U
 *         N   C   X   D   X   E   X   L   E
 *           R   R   D   D   M   M   M   M
 *             G   C   C   H   H   C   C
 */
