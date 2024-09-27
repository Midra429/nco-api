/** dアニメストア ニコニコ支店のチャンネルID */
export const DANIME_CHANNEL_ID = 2632720

/**
 * ニコニコ実況のチャンネル一覧 (地デジ)
 */
export const JIKKYO_CHANNELS_DTV = {
  jk1: 'NHK総合',
  jk2: 'NHK Eテレ',
  jk4: '日本テレビ',
  jk5: 'テレビ朝日',
  jk6: 'TBSテレビ',
  jk7: 'テレビ東京',
  jk8: 'フジテレビ',
  jk9: 'TOKYO MX',
  jk10: 'テレ玉',
  jk11: 'tvk',
  jk12: 'チバテレビ',
  jk13: 'サンテレビ',
  jk14: 'KBS京都',
} as const

/**
 * ニコニコ実況のチャンネル一覧 (BS, CS)
 */
export const JIKKYO_CHANNELS_BS_CS = {
  jk101: 'NHK BS1',
  jk103: 'NHK BSプレミアム',
  jk141: 'BS日テレ',
  jk151: 'BS朝日',
  jk161: 'BS-TBS',
  jk171: 'BSテレ東',
  jk181: 'BSフジ',
  jk191: 'WOWOW PRIME',
  jk192: 'WOWOW LIVE',
  jk193: 'WOWOW CINEMA',
  jk211: 'BS11',
  jk222: 'BS12 トゥエルビ',
  jk236: 'BSアニマックス',
  jk252: 'WOWOW PLUS',
  jk260: 'BS松竹東急',
  jk263: 'BSJapanext',
  jk265: 'BSよしもと',
  jk333: 'AT-X',
} as const

/**
 * ニコニコ実況のチャンネル一覧
 */
export const JIKKYO_CHANNELS = {
  ...JIKKYO_CHANNELS_DTV,
  ...JIKKYO_CHANNELS_BS_CS,
} as const

/**
 * しょぼいカレンダーのチャンネルID一覧
 */
export const SYOBOCAL_CHANNELS = {
  '1': 'NHK総合',
  '2': 'NHK Eテレ',
  '3': 'フジテレビ',
  '4': '日本テレビ',
  '5': 'TBS',
  '6': 'テレビ朝日',
  '7': 'テレビ東京',
  '8': 'tvk',
  '9': 'NHK-BS1',
  '10': 'NHK-BS2',
  '11': 'NHK-BShi',
  '12': 'WOWOW',
  '13': 'チバテレビ',
  '14': 'テレ玉',
  '15': 'BSテレ東',
  '16': 'BS-TBS',
  '17': 'BSフジ',
  '18': 'BS朝日',
  '19': 'TOKYO MX',
  '20': 'AT-X',
  '21': 'アニマックス',
  '22': 'キッズステーション',
  '23': 'カートゥーンネットワーク',
  '24': 'エンタメ～テレ',
  '25': 'テレ朝チャンネル',
  '26': 'チャンネルNECO',
  '27': 'animate.tv',
  '28': 'テレビ大阪',
  '29': 'ラジ＠',
  '30': 'ニッポン放送(1242)',
  '31': 'スカパー181ch',
  '32': 'スカパー180ch',
  '33': 'スカパー160ch',
  '34': 'スカパー242ch',
  '35': 'ラジオ大阪(1314)',
  '36': 'KBS京都(1143)',
  '37': 'RCC中国放送(1350)',
  '38': 'ABCラジオ(1008)',
  '39': '東映チャンネル',
  '40': '日本映画専門チャンネル',
  '41': '文化放送(1134)',
  '42': 'ファミリー劇場',
  '43': 'フジテレビTWO',
  '44': 'スカパー182ch',
  '45': 'スカパー183ch',
  '46': 'mugimugi.com',
  '47': 'MONDOTV',
  '48': 'MBS毎日放送',
  '49': 'NHKラジオ第一',
  '50': 'BSQR 489',
  '51': 'LFX488',
  '52': 'TBSチャンネル1',
  '53': 'TBSラジオ(954)',
  '54': '読売テレビ',
  '55': 'YFTV',
  '56': 'アニマルプラネット',
  '57': 'その他のインターネット',
  '58': 'サンテレビジョン',
  '59': 'テレビ愛知',
  '60': 'テレビ新広島',
  '61': 'ディスカバリーチャンネル',
  '62': 'スカパー101ch',
  '63': 'スカパー',
  '64': 'NHK Eテレ2',
  '65': 'NHK Eテレ3',
  '66': 'KBS京都',
  '67': 'ABCテレビ',
  '68': 'ch.280 ActOnTV(by recruit)',
  '69': 'なし',
  '70': '関西テレビ',
  '71': 'BS日テレ',
  '72': '群馬テレビ',
  '73': 'LFX BB',
  '74': '奈良テレビ',
  '75': 'GyaO!',
  '76': 'WOWOWシネマ',
  '77': '東海テレビ',
  '78': 'ShowTime',
  '79': 'CBCテレビ',
  '80': '中京テレビ',
  '81': 'メ～テレ',
  '82': '三重テレビ',
  '83': 'ぎふチャン',
  '84': 'sky・A',
  '85': 'Yahoo!動画',
  '86': 'テレビ和歌山',
  '87': 'ＢＢＣびわ湖放送',
  '88': 'HTB北海道テレビ',
  '89': 'HBC北海道放送',
  '90': 'TVhテレビ北海道',
  '91': 'UHB北海道文化放送',
  '92': 'STV札幌テレビ',
  '93': 'TVQ九州放送',
  '94': 'RKB毎日放送',
  '95': 'テレビせとうち',
  '96': '福岡放送',
  '97': 'WOWOWライブ',
  '98': '東北放送',
  '99': '広島ホームテレビ',
  '100': 'とちぎテレビ',
  '101': 'BIGLOBEストリーム',
  '102': '中国放送',
  '103': '広島テレビ',
  '104': '岡山放送',
  '105': '山陽放送',
  '106': 'NHK-FM',
  '107': 'バンダイチャンネル',
  '108': 'フレッツ・スクウェア（NTT東日本）',
  '109': 'フジテレビONE',
  '110': 'バンダイチャンネルキッズ',
  '111': 'テレビ信州',
  '112': '330ch WOWOW',
  '113': 'SBSテレビ',
  '114': '南海放送',
  '115': 'テレビ愛媛',
  '116': 'あいテレビ',
  '117': '愛媛朝日テレビ',
  '118': 'i-revo',
  '119': '日テレプラス',
  '120': '@nifty',
  '121': 'ビクトリーチャンネル',
  '122': 'gooアニメ',
  '123': '瀬戸内海放送',
  '124': '西日本放送',
  '125': 'テレビ山口',
  '126': '山口放送',
  '127': '山口朝日放送',
  '128': 'BS11イレブン',
  '129': 'BS12トゥエルビ',
  '130': '角川アニメチャンネル',
  '131': 'フジテレビNEXT',
  '132': 'ニコニコアニメチャンネル',
  '133': 'ラジオ関西(558)',
  '134': 'MBSラジオ(1179)',
  '135': 'PLAYSTATION Store',
  '136': 'ニコニコ生放送',
  '137': 'スカパー162ch',
  '138': '九州朝日放送',
  '139': '東海ラジオ(1332)',
  '140': '南海放送(1116)',
  '141': 'テレビ静岡',
  '142': '熊本放送',
  '143': 'アニメワン',
  '144': 'テレビ西日本',
  '145': 'サガテレビ',
  '146': '北陸朝日放送',
  '147': '北陸放送',
  '148': '福井放送',
  '149': '福井テレビ',
  '150': 'スカチャンHD800',
  '151': 'MUSIC ON! TV',
  '152': 'ムービープラス',
  '153': 'ホームドラマチャンネル',
  '154': 'だいいちテレビ',
  '155': '静岡朝日テレビ',
  '156': '超!A&G+',
  '157': 'アニメNewtypeチャンネル',
  '158': '放送大学CSテレビ',
  '159': '放送大学CSラジオ',
  '160': 'スカチャン',
  '161': 'ディズニーXD',
  '162': 'TOKYO FM(80.0)',
  '163': 'ディズニー・チャンネル',
  '164': 'Music Japan TV',
  '165': 'ニコニコチャンネル',
  '166': 'bayfm(78.0)',
  '167': 'TAKARAZUKA SKY STAGE',
  '168': '長崎放送',
  '169': '長崎文化放送',
  '170': 'テレビ長崎',
  '171': '長崎国際テレビ',
  '172': 'テレビ金沢',
  '173': 'スカチャンHD801',
  '174': 'スカチャン802',
  '175': 'スカチャンHD192',
  '176': '旅チャンネル',
  '177': 'テレビドガッチ',
  '178': 'YouTube',
  '179': 'NHK BSプレミアム',
  '180': 'InterFM(76.1)',
  '181': '福井さかいケーブルテレビ',
  '182': 'USTREAM',
  '183': '中部日本放送(1053)',
  '184': 'ZIP-FM(77.8)',
  '185': 'レディオキューブFM三重(78.9)',
  '186': 'FM AICHI(80.7)',
  '187': 'TOKYO MX2',
  '188': 'NACK5(79.5)',
  '189': 'bayfm78(78.0)',
  '190': 'FMヨコハマ(84.7)',
  '191': 'ラジオ日本(1422)',
  '192': 'NHKワンセグ2',
  '193': 'バンダイチャンネルライブ！',
  '194': 'スペースシャワーTV',
  '195': 'NHKラジオ第二',
  '196': 'BSスカパー！',
  '197': 'BSアニマックス',
  '198': '青森放送',
  '199': '青森朝日放送',
  '200': '青森テレビ',
  '201': '琉球放送',
  '202': '琉球朝日放送',
  '203': '沖縄テレビ',
  '204': 'WOWOWプライム',
  '205': '東映特撮 YouTube Official',
  '206': 'BSN',
  '207': 'TeNY',
  '208': '新潟テレビ21',
  '209': 'NST',
  '210': 'DMM.com',
  '211': 'スペースシャワーTV プラス',
  '212': 'Dlife',
  '213': '日経CNBC',
  '214': 'スター・チャンネル3',
  '215': 'TBSチャンネル2',
  '216': 'スーパー！ドラマTV',
  '217': 'スター・チャンネル1',
  '218': 'ラジオNIKKEI第1',
  '219': 'スター・チャンネル2',
  '220': '衛星劇場',
  '221': '時代劇専門チャンネル',
  '222': '歌謡ポップスチャンネル',
  '223': 'リスラジ',
  '224': 'テレ朝チャンネル1',
  '225': '新作TVアニメ',
  '226': 'アニメ24',
  '227': '深夜アニメ',
  '228': 'なつかしアニメ',
  '229': 'ラブコメアニメ',
  '230': 'FRESH LIVE',
  '231': '仙台放送',
  '232': 'ミヤギテレビ',
  '233': 'ラジオNIKKEI第2',
  '234': 'dアニメストア',
  '235': 'MTV',
  '236': '長野放送',
  '237': '長野朝日放送',
  '238': 'ウルトラゲームス',
  '239': 'Abemaアニメ',
  '240': 'アニメLIVE',
  '241': 'みんなのアニメ',
  '242': '日本海テレビ',
  '243': 'テレ朝チャンネル2',
  '244': 'Abemaアニメ2',
  '245': 'J:COMテレビ',
  '246': 'AG-ON Premium',
  '247': 'アニメLIVE2',
  '248': 'Amazon Prime Video',
  '249': 'Abemaアニメ3',
  '250': 'Abemaビデオ',
  '251': 'WOWOWプラス',
  '252': 'みんなのアニメ2',
  '253': '信越放送',
  '254': 'AXN',
  '255': '東日本放送',
  '256': 'Netflix',
  '257': 'Hulu',
  '258': 'J SPORTS 1',
  '259': 'J SPORTS 2',
  '260': 'J SPORTS 3',
  '261': 'J SPORTS 4',
  '262': 'スカイA',
  '263': '日テレNEWS24',
  '264': 'スポーツライブ＋',
  '265': 'GAORA',
  '266': '日テレジータス',
  '267': 'NHKワールドJAPAN',
  '268': 'FOD',
  '269': 'TVer',
  '270': 'みんなのアニメ3',
  '271': 'BS松竹東急',
  '272': 'BSよしもと',
  '273': 'BSJapanext',
  '274': 'Disney+',
  '275': 'さんいん中央テレビ',
  '276': 'アニメLIVE3',
  '277': "なつかしアニメ90's",
  '278': "なつかしアニメ00's",
  '279': "なつかしアニメ80's",
  '280': '日常青春アニメ',
  '281': 'ABEMA特設その他',
  '282': '異世界ファンタジー',
} as const

/**
 * ニコニコ実況としょぼいカレンダーのチャンネルIDのペア
 */
export const CHANNEL_IDS_JIKKYO_SYOBOCAL = [
  ['jk1', '1'],
  ['jk2', '2'],
  ['jk4', '4'],
  ['jk5', '6'],
  ['jk6', '5'],
  ['jk7', '7'],
  ['jk8', '3'],
  ['jk9', '19'],
  ['jk10', '14'],
  ['jk11', '8'],
  ['jk12', '13'],
  ['jk13', '58'],
  ['jk14', '66'],
  ['jk101', '9'],
  ['jk103', '179'],
  ['jk141', '71'],
  ['jk151', '18'],
  ['jk161', '16'],
  ['jk171', '15'],
  ['jk181', '17'],
  ['jk191', '204'],
  ['jk192', '97'],
  ['jk193', '76'],
  ['jk211', '128'],
  ['jk222', '129'],
  ['jk236', '197'],
  ['jk252', '251'],
  ['jk260', '271'],
  ['jk263', '273'],
  ['jk265', '272'],
  ['jk333', '20'],
] as const satisfies [
  keyof typeof JIKKYO_CHANNELS,
  keyof typeof SYOBOCAL_CHANNELS
][]
