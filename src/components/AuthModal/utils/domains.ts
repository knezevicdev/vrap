interface DomainInfo {
  email_domain: string;
  intended_domain: string;
}

const invalidDomainsList: DomainInfo[] = [
  {
    email_domain: 'gnail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmai.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gamil.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmal.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmaill.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmaol.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yhoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.com.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'uahoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'ivloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'yhaoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.om',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmqil.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yaoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gma.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'icoud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icould.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gamail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahooo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahho.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmaio.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotnail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'gmaim.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmai.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hormail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'icloid.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'yahoi.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yaboo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'icooud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gmaiil.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.om',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'iclould.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gmaik.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmsil.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'iclod.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.co',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'hotmail.co',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'ahoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmaail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmaip.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmil.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'iclou.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'ickoud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'yahool.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'homail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'gmmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'putlook.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'vmail.com',
    intended_domain: 'ymail.com',
  },
  {
    email_domain: 'yah.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'ocloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gmail.net',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmal.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'aol.co',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'yahok.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'outlok.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'gmali.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.ccom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmial.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hoymail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'ucloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'y7mail.com',
    intended_domain: 'ymail.com',
  },
  {
    email_domain: 'oulook.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'g.comail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.co.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmall.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'iclous.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'ifloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'ayhoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'outlook.co',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'outlool.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'glail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'icliud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloyd.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gmwil.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotamil.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'iclpud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'outllok.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'hotail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'ioud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'yahpp.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'ggmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'comcaat.net',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'berizon.net',
    intended_domain: 'verizon.net',
  },
  {
    email_domain: 'hotmaill.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.xom',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmaol.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'icloud.net',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.om',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'aol.om',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'ouook.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'outlokk.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'ouylook.com',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'gmajl.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmeil.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmila.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'comcasr.net',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'comcat.net',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'comcst.net',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'iclooud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.com.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloue.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icolud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'igmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'ilcoud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'yyahoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yohoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoom.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yaahoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yayoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yah00.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'ymai.com',
    intended_domain: 'ymail.com',
  },
  {
    email_domain: 'yashoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'ayahoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'fgmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gahoo.com',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gemail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmailc.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'g.mail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmai.l.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmailm.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmailo.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.org',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmails.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmamil.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmiail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmnail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmsail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: '1gmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmaim.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmaul.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hptmail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'iglou.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'ciloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gmaikl.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.commail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.do',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmaili.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmisl.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gnmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gtmail.com',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'homtail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotma.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hot.mail.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmailc.om',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.com.com',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'iclodu.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloiud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iclond.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iclouc.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloude.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloudl.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iclour.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iclound.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iclouud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iicloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'aol.com.com',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'aoll.com',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'aoo.com',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'ixloud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'aiol.com',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'gmail.con',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.co',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.con',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'icloud.con',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'hotmail.con',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'gmail.clm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.vom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.cim',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.col',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'aol.con',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'gmail.cm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'outlook.con',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'yahoo.vom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.cok',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.xom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'live.con',
    intended_domain: 'live.com',
  },
  {
    email_domain: 'gmail.ckm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.come',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comcom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.cim',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.cpm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.coom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.comm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.comn',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.fom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.clm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.xom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'msn.con',
    intended_domain: 'msn.com',
  },
  {
    email_domain: 'gmail.coml',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'me.con',
    intended_domain: 'me.com',
  },
  {
    email_domain: 'gmail.comj',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comp',
    intended_domain: '',
  },
  {
    email_domain: 'ymail.con',
    intended_domain: 'ymail.com',
  },
  {
    email_domain: 'yahoo.cok',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.comtest',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.gom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.col',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.c',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'icloud.cim',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'iclud.com',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'gmail.comq',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo.ocm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.ckm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.coom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.cpm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.cin',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gnail.con',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmail.om',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'gmail.comi',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.conm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmail.vom',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'icloud.cok',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.col',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.clm',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.vom',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'rocketmail.con',
    intended_domain: 'rocketmail.com',
  },
  {
    email_domain: 'yahoo.fom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'gmail.dom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmail.clm',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'aol.comm',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'outlook.cok',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'gmail.comc',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'hotmail.cm',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.comm',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'icloud.come',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'aol.clm',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'yahoo.comn',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.c',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.coml',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.coms',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.comp',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'sbcglobal.ner',
    intended_domain: 'sbcglobal.net',
  },
  {
    email_domain: 'gmail.ciom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.coim',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.coma',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.como',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comw',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.copm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.ocm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'comcast.bet',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'comcast.met',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'aol.cm',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'att.ner',
    intended_domain: 'att.net',
  },
  {
    email_domain: 'outlook.clm',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'outlook.cm',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'gmail.colm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comb',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.coms',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'comcast.ent',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'hmail.con',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.cim',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.ckm',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.coml',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.fom',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'cox.met',
    intended_domain: 'cox.net',
  },
  {
    email_domain: 'aol.col',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'mac.con',
    intended_domain: 'mac.com',
  },
  {
    email_domain: 'mail.con',
    intended_domain: 'mail.com',
  },
  {
    email_domain: 'yahoo.ccom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'vroom.con',
    intended_domain: 'vroom.com',
  },
  {
    email_domain: 'sbcglobal.ney',
    intended_domain: 'sbcglobal.net',
  },
  {
    email_domain: 'yahoo.copm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.c0m',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.conm',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.gom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.como',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'msn.cim',
    intended_domain: 'msn.com',
  },
  {
    email_domain: 'outlook.col',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'outlook.xom',
    intended_domain: 'outlook.com',
  },
  {
    email_domain: 'gmail.ccm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comd',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comk',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comr',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comt',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.on',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'comcast.ne',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'hmail.vom',
    intended_domain: '',
  },
  {
    email_domain: 'hotmail.ccom',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.cmo',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'aol.cim',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'aol.cok',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'me.cim',
    intended_domain: 'me.com',
  },
  {
    email_domain: 'gmail.c0m',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.cmo',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.cocm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.coc',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.cokm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmai.lcom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comg',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comh',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.commm',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.comz',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.cvom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmail.cpom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmil.con',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmsil.con',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'bellsouth.met',
    intended_domain: 'bellsouth.net',
  },
  {
    email_domain: 'bellsouth.neg',
    intended_domain: 'bellsouth.net',
  },
  {
    email_domain: 'comcast.neg',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'comcast.ney',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'comcast.nt',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'comcast.nwt',
    intended_domain: 'comcast.net',
  },
  {
    email_domain: 'hotmail.cok',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.comcom',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.come',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'hotmail.cpm',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'icloud.ckm',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.cm',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.comm',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.fom',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icloud.xom',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'icooud.con',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'aol.c',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'aol.comj',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'aol.vom',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'aol.xom',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'ivloud.vom',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'ail.con',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'gmail',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'gmailcom',
    intended_domain: 'gmail.com',
  },
  {
    email_domain: 'yahoo',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'hotmail',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'yahoocom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'yahoo.comcom',
    intended_domain: 'yahoo.com',
  },
  {
    email_domain: 'icloud',
    intended_domain: 'icloud.com',
  },
  {
    email_domain: 'com',
    intended_domain: '',
  },
  {
    email_domain: 'hotmailcom',
    intended_domain: 'hotmail.com',
  },
  {
    email_domain: 'aolcom',
    intended_domain: 'aol.com',
  },
  {
    email_domain: 'mail.mil',
    intended_domain: '',
  },
];

export const invalidDomains = invalidDomainsList.reduce<
  Record<string, DomainInfo>
>((acc, curr) => {
  acc[curr.email_domain] = curr;

  return acc;
}, {});

export const isEmailDomainInvalid = (
  email: string
): {
  isInvalid: boolean;
  intendedAddress: string;
} => {
  const domain = email?.split('@').slice(-1)[0];
  const invalidDomain = invalidDomains[domain];
  const intendedDomain = invalidDomain?.intended_domain ?? '';

  return {
    isInvalid: !!invalidDomain,
    intendedAddress: intendedDomain
      ? email.replace(domain, intendedDomain)
      : '',
  };
};

export const invalidTlds = [
  '.con',
  '.comm',
  '.ccom',
  '.coom',
  '.xom',
  '.om',
  '.c0m',
  '.conm',
  '.gom',
  '.comp',
  '.coms',
  '.coml',
  '.comn',
  '.fom',
  '.comcom',
  '.comcon',
  '.comco',
  '.cpm',
  '.ckm',
  '.ocm',
  '.col',
  '.cim',
  '.ney',
  '.cm',
  '.clm',
  '.cok',
  '.vom',
  '.come',
  '.com.com',
  '.com.con',
  '.con.con',
  '.con.com',
];

export const isInvalidEmailTld = (email: string): boolean => {
  return invalidTlds.some((tld) => email.endsWith(tld));
};
