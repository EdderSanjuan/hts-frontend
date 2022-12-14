import { state } from "@angular/animations";
import StringUtilities from "./StringUtilities";

export enum DocumentType {
  RFC = 'rfc',
  CURP = 'curp'
}

type Gender = 'M' | 'F'

interface state {
  state: string;
  initial : string;
}

export default class DocumentGenerator {

   static getCURP = (name: string, surnameFather: string, surnameMother: string, bornDay: string, bornMonth: string, bornYear: string, bornState: string, gender: Gender) => {

    name = StringUtilities.clearString(name)
    name = DocumentGenerator.removeCommonNames(name)
    surnameFather = StringUtilities.clearString(surnameFather)
    surnameFather = DocumentGenerator.removePrefixes(surnameFather)
    surnameMother = StringUtilities.clearString(surnameMother)
    surnameMother = DocumentGenerator.removePrefixes(surnameMother)
    bornDay = StringUtilities.clearString(bornDay)
    bornMonth = StringUtilities.clearString(bornMonth)
    bornYear = StringUtilities.clearString(bornYear)

    let curp = DocumentGenerator.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, DocumentType.CURP)
    curp = DocumentGenerator.removeBadWords(curp, DocumentType.CURP)
    curp += DocumentGenerator.getGenderLetter(gender)
    curp += DocumentGenerator.getBornStateCode(bornState)
    curp += StringUtilities.getFirstInternalConsonant(surnameFather)
    curp += StringUtilities.getFirstInternalConsonant(surnameMother)
    curp += StringUtilities.getFirstInternalConsonant(name)

    curp += DocumentGenerator.getSpecialChar(bornYear)
    curp += DocumentGenerator.getLastCURPDigit(curp)
    return curp
  }

   static getRFC = (name: string, surnameFather: string, surnameMother: string, bornDay: string, bornMonth: string, bornYear: string) => {

    name = StringUtilities.clearString(name)
    name = DocumentGenerator.removeCommonNames(name)
    surnameFather = StringUtilities.clearString(surnameFather)
    surnameMother = StringUtilities.clearString(surnameMother)
    bornDay = StringUtilities.clearString(bornDay)
    bornMonth = StringUtilities.clearString(bornMonth)
    bornYear = StringUtilities.clearString(bornYear)

    return DocumentGenerator.getCommonPart(name, surnameFather, surnameMother, bornDay, bornMonth, bornYear, DocumentType.RFC)
  }

  private static getCommonPart (name: string, surnameFather: string, surnameMother: string, bornDay:string, bornMonth:string, bornYear:string, type: DocumentType) {
    let commonPart = surnameFather[0]
    commonPart += StringUtilities.getFirstInternalVowel(surnameFather)
    commonPart += surnameMother[0] || 'X'
    commonPart += name[0]
    commonPart = DocumentGenerator.removeBadWords(commonPart, type)
    commonPart += bornYear.substring(2)
    commonPart += bornMonth
    commonPart += bornDay
    return commonPart
  }

  private static getBornStateCode (stateName: string){
    
    const { clearString, removeAccents } = StringUtilities
    const parsedStateName = removeAccents(clearString(stateName)) as string;
   
    return DocumentGenerator.states[parsedStateName as keyof typeof state];
  }

  private static getGenderLetter (gender: Gender) {
    switch (gender) {
      case 'M':
        return 'H'
      case 'F':
        return 'M'
    }
  }

  private static getSpecialChar (bornYear: string) {
    if (bornYear[0] === '1') {
      return '0'
    } else {
      return 'A'
    }
  }

  private static removeCommonNames = (currentName: string): string => (
    DocumentGenerator
      .notAcceptedNames
      .reduce((name, notAccepted) => name.replace(new RegExp('^' + notAccepted), '')
        , currentName)
  )

  private static removePrefixes = (currentName: string): string => (
    DocumentGenerator
      .prefixes
      .reduce((name, notAccepted) => name.replace(new RegExp('^' + notAccepted), '')
        , currentName)
  )

  private static removeBadWords (word: string, type: DocumentType) {

    const badWordsList = DocumentType.CURP === type ? DocumentGenerator.badWordsCURP : DocumentGenerator.badWordsRFC;

    if (badWordsList[word as keyof typeof state]) {
      return badWordsList[word as keyof typeof state];
    }

    return word
  }

  private static states = {
    'AGUASCALIENTES': 'AS',
    'BAJA CALIFORNIA': 'BC',
    'BAJA CALIFORNIA NORTE': 'BC',
    'BAJA CALIFORNIA SUR': 'BS',
    'CAMPECHE': 'CC',
    'COAHUILA': 'CL',
    'COLIMA': 'CM',
    'CHIAPAS': 'CS',
    'CHIHUAHUA': 'CH',
    'CIUDAD DE MEXICO': 'DF',
    'DISTRITO FEDERAL': 'DF',
    'DURANGO': 'DG',
    'GUANAJUATO': 'GT',
    'GUERRERO': 'GR',
    'HIDALGO': 'HG',
    'JALISCO': 'JC',
    'MEXICO': 'MC',
    'MICHOACAN': 'MN',
    'MORELOS': 'MS',
    'NAYARIT': 'NT',
    'NUEVO LEON': 'NL',
    'OAXACA': 'OC',
    'PUEBLA': 'PL',
    'QUERETARO': 'QT',
    'QUINTANA ROO': 'QR',
    'SAN LUIS POTOSI': 'SP',
    'SINALOA': 'SL',
    'SONORA': 'SR',
    'TABASCO': 'TC',
    'TAMAULIPAS': 'TS',
    'TLAXCALA': 'TL',
    'VERACRUZ': 'VZ',
    'YUCATAN': 'YN',
    'ZACATECAS': 'ZS'
  }

  private static notAcceptedNames = [
    'MARIA DEL ',
    'MARIA DE LOS ',
    'MARIA ',
    'JOSE DE ',
    'JOSE ',
    'MA. ',
    'MA ',
    'M. ',
    'J. ',
    'J '
  ]

  private static prefixes = [
    'DE ',
    'DEL '
  ]

  private static badWordsCURP = {
    'BACA': 'BXCA',
    'LOCO': 'LXCO',
    'BAKA': 'BXKA',
    'BUEI': 'BXEI',
    'BUEY': 'BXEY',
    'CACA': 'CXCA',
    'CACO': 'CXCO',
    'CAGA': 'CXGA',
    'CAGO': 'CXGO',
    'CAKA': 'CXKA',
    'CAKO': 'CXKO',
    'COGE': 'CXGE',
    'COGI': 'CXGI',
    'COJA': 'CXJA',
    'COJE': 'CXJE',
    'COJI': 'CXJI',
    'COJO': 'CXJO',
    'COLA': 'CXLA',
    'CULO': 'CXLO',
    'FALO': 'FXLO',
    'FETO': 'FXTO',
    'GETA': 'GXTA',
    'GUEI': 'GXEI',
    'GUEY': 'GXEY',
    'JETA': 'JXTA',
    'JOTO': 'JXTO',
    'KACA': 'KXCA',
    'KACO': 'KXCO',
    'KAGA': 'KXGA',
    'KAGO': 'KXGO',
    'KAKA': 'KXKA',
    'KAKO': 'KXKO',
    'KOGE': 'KXGE',
    'KOGI': 'KXGI',
    'KOJA': 'KXJA',
    'KOJE': 'KXJE',
    'KOJI': 'KXJI',
    'KOJO': 'KXJO',
    'KOLA': 'KXLA',
    'KULO': 'KXLO',
    'LILO': 'LXLO',
    'LOKA': 'LXKA',
    'LOKO': 'LXKO',
    'MAME': 'MXME',
    'MAMO': 'MXMO',
    'MEAR': 'MXAR',
    'MEAS': 'MXAS',
    'MEON': 'MXON',
    'MIAR': 'MXAR',
    'MION': 'MXON',
    'MOCO': 'MXCO',
    'MOKO': 'MXKO',
    'MULA': 'MXLA',
    'MULO': 'MXLO',
    'NACA': 'NXCA',
    'NACO': 'NXCO',
    'PEDA': 'PXDA',
    'PEDO': 'PXDO',
    'PENE': 'PXNE',
    'PIPI': 'PXPI',
    'PITO': 'PXTO',
    'POPO': 'PXPO',
    'PUTA': 'PXTA',
    'PUTO': 'PXTO',
    'QULO': 'QXLO',
    'RATA': 'RXTA',
    'ROBA': 'RXBA',
    'ROBE': 'RXBE',
    'ROBO': 'RXBO',
    'RUIN': 'RXIN',
    'SENO': 'SXNO',
    'TETA': 'TXTA',
    'VACA': 'VXCA',
    'VAGA': 'VXGA',
    'VAGO': 'VXGO',
    'VAKA': 'VXKA',
    'VUEI': 'VXEI',
    'VUEY': 'VXEY',
    'WUEI': 'WXEI',
    'WUEY': 'WXEY'
  }

  private static getLastCURPDigit = (incompleteCurp: string) => {
    const dictionary = '0123456789ABCDEFGHIJKLMN??OPQRSTUVWXYZ'
    let lnSum = 0.0
    let lnDigt = 0.0

    for (let i = 0; i < 17; i++) {
      lnSum = lnSum + dictionary.indexOf(incompleteCurp.charAt(i)) * (18 - i)
    }

    lnDigt = 10 - lnSum % 10
    if (lnDigt === 10) return 0
    return lnDigt
  }

  private static badWordsRFC = {
    'BUEI': 'BUEX',
    'BUEY': 'BUEX',
    'CACA': 'CACX',
    'CACO': 'CACX',
    'CAGA': 'CAGX',
    'CAGO': 'CAGX',
    'CAKA': 'CAKX',
    'COGE': 'COGX',
    'COJA': 'COJX',
    'COJE': 'COJX',
    'COJI': 'COJX',
    'COJO': 'COJX',
    'CULO': 'CULX',
    'FETO': 'FETX',
    'GUEY': 'GUEX',
    'JOTO': 'JOTX',
    'KACA': 'KACX',
    'KACO': 'KACX',
    'KAGA': 'KAGX',
    'KAGO': 'KAGX',
    'KOGE': 'KOGX',
    'KOJO': 'KOJX',
    'KAKA': 'KAKX',
    'KULO': 'KULX',
    'MAME': 'MAMX',
    'MAMO': 'MAMX',
    'MEAR': 'MEAX',
    'MEON': 'MEOX',
    'MION': 'MIOX',
    'MOCO': 'MOCX',
    'MULA': 'MULX',
    'PEDA': 'PEDX',
    'PEDO': 'PEDX',
    'PENE': 'PENX',
    'PUTA': 'PUTX',
    'PUTO': 'PUTX',
    'QULO': 'QULX',
    'RATA': 'RATX',
    'RUIN': 'RUIX'
  }

  private static characterValues = {
    '0': '00',
    '1': '01',
    '2': '02',
    '3': '03',
    '4': '04',
    '5': '05',
    '6': '06',
    '7': '07',
    '8': '08',
    '9': '09',
    'A': '10',
    'B': '11',
    'C': '12',
    'D': '13',
    'F': '15',
    'E': '14',
    'G': '16',
    'H': '17',
    'I': '18',
    'J': '19',
    'K': '20',
    'L': '21',
    'M': '22',
    'N': '23',
    '&': '24',
    'O': '25',
    'P': '26',
    'Q': '27',
    'R': '28',
    'S': '29',
    'T': '30',
    'U': '31',
    'V': '32',
    'W': '33',
    'X': '34',
    'Y': '35',
    'Z': '36',
    ' ': '37',
    '??': '38'
  }
}