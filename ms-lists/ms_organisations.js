'use strict'

const organisations = [
  {value:"Home Office - UK Border Force UKBF",label:"Home Office - UK Border Force UKBF"},
  {value:"Home Office - UK Visas and Immigration UKVI",label:"Home Office - UK Visas and Immigration UKVI"},
  {value:"Home Office - Illegal Migration Operations Command IMOC",label:"Home Office - Illegal Migration Operations Command IMOC"},
  {value:"Home Office - Immigration Enforcement IE",label:"Home Office - Immigration Enforcement IE"},
  {value:"Health and Social Care Trusts - HSC Trusts",label:"Health and Social Care Trusts - HSC Trusts"},
  {value:"National Crime Agency NCA",label:"National Crime Agency NCA"},
  {value:"Trafficking Awareness Raising Alliance TARA",label:"Trafficking Awareness Raising Alliance TARA"},
  {value:"Migrant Help",label:"Migrant Help"},
  {value:"Kalayaan",label:"Kalayaan"},
  {value:"Gangmasters and Labour Abuse Authority GLAA",label:"Gangmasters and Labour Abuse Authority GLAA"},
  {value:"Medaille Trust",label:"Medaille Trust"},
  {value:"The Salvation Army",label:"The Salvation Army"},
  {value:"Barnardo's",label:"Barnardo's"},
  {value:"National Society for the Prevention of Cruelty to Children NSPCC CTAC",label:"National Society for the Prevention of Cruelty to Children NSPCC CTAC"},
  {value:"Unseen",label:"Unseen"},
  {value:"New Pathways",label:"New Pathways"},
  {value:"BAWSO",label:"BAWSO"},
  {value:"Avon and Somerset Constabulary",label:"Avon and Somerset Constabulary"},
  {value:"Bedfordshire Police",label:"Bedfordshire Police"},
  {value:"Cambridgeshire Constabulary",label:"Cambridgeshire Constabulary"},
  {value:"Cheshire Constabulary",label:"Cheshire Constabulary"},
  {value:"City of London Police",label:"City of London Police"},
  {value:"Cleveland Police",label:"Cleveland Police"},
  {value:"Cumbria Constabulary",label:"Cumbria Constabulary"},
  {value:"Derbyshire Constabulary",label:"Derbyshire Constabulary"},
  {value:"Devon & Cornwall Police",label:"Devon & Cornwall Police"},
  {value:"Dorset Police",label:"Dorset Police"},
  {value:"Durham Constabulary",label:"Durham Constabulary"},
  {value:"Essex Police",label:"Essex Police"},
  {value:"Gloucestershire Constabulary",label:"Gloucestershire Constabulary"},
  {value:"Greater Manchester Police",label:"Greater Manchester Police"},
  {value:"Hampshire Constabulary",label:"Hampshire Constabulary"},
  {value:"Hertfordshire Constabulary",label:"Hertfordshire Constabulary"},
  {value:"Humberside Police",label:"Humberside Police"},
  {value:"Kent Police",label:"Kent Police"},
  {value:"Lancashire Constabulary",label:"Lancashire Constabulary"},
  {value:"Leicestershire Police",label:"Leicestershire Police"},
  {value:"Lincolnshire Police",label:"Lincolnshire Police"},
  {value:"Merseyside Police",label:"Merseyside Police"},
  {value:"Metropolitan Police Service",label:"Metropolitan Police Service"},
  {value:"Norfolk Constabulary",label:"Norfolk Constabulary"},
  {value:"North Yorkshire Police",label:"North Yorkshire Police"},
  {value:"Northamptonshire Police",label:"Northamptonshire Police"},
  {value:"Northumbria Police",label:"Northumbria Police"},
  {value:"Nottinghamshire Police",label:"Nottinghamshire Police"},
  {value:"South Yorkshire Police",label:"South Yorkshire Police"},
  {value:"Staffordshire Police",label:"Staffordshire Police"},
  {value:"Suffolk Constabulary",label:"Suffolk Constabulary"},
  {value:"Surrey Police",label:"Surrey Police"},
  {value:"Sussex Police",label:"Sussex Police"},
  {value:"Thames Valley Police",label:"Thames Valley Police"},
  {value:"Warwickshire Police",label:"Warwickshire Police"},
  {value:"West Mercia Police",label:"West Mercia Police"},
  {value:"West Midlands Police",label:"West Midlands Police"},
  {value:"West Yorkshire Police",label:"West Yorkshire Police"},
  {value:"Wiltshire Police",label:"Wiltshire Police"},
  {value:"Police Service of Northern Ireland",label:"Police Service of Northern Ireland"},
  {value:"Police Scotland",label:"Police Scotland"},
  {value:"Dyfed-Powys Police",label:"Dyfed-Powys Police"},
  {value:"Gwent Police",label:"Gwent Police"},
  {value:"North Wales Police",label:"North Wales Police"},
  {value:"South Wales Police",label:"South Wales Police"},
  {value:"British Transport Police",label:"British Transport Police"},
  {value:"National Police Air Service",label:"National Police Air Service"},
  {value:"Bath and North East Somerset Council",label:"Bath and North East Somerset Council"},
  {value:"Blackburn with Darwen Borough Council",label:"Blackburn with Darwen Borough Council"},
  {value:"Bedford Borough Council",label:"Bedford Borough Council"},
  {value:"Birmingham City Council",label:"Birmingham City Council"},
  {value:"Brighton and Hove City Council",label:"Brighton and Hove City Council"},
  {value:"Barnsley Metropolitan Borough Council",label:"Barnsley Metropolitan Borough Council"},
  {value:"Bolton Metropolitan Borough Council",label:"Bolton Metropolitan Borough Council"},
  {value:"Blackpool Borough Council",label:"Blackpool Borough Council"},
  {value:"Bracknell Forest Council",label:"Bracknell Forest Council"},
  {value:"City of Bradford Metropolitan District Council",label:"City of Bradford Metropolitan District Council"},
  {value:"Bristol City Council",label:"Bristol City Council"},
  {value:"Bury Metropolitan Borough Council",label:"Bury Metropolitan Borough Council"},
  {value:"Central Bedfordshire Council",label:"Central Bedfordshire Council"},
  {value:"Cheshire East Council",label:"Cheshire East Council"},
  {value:"Cheshire West and Chester Council",label:"Cheshire West and Chester Council"},
  {value:"Calderdale Metropolitan Borough Council",label:"Calderdale Metropolitan Borough Council"},
  {value:"Cornwall Council",label:"Cornwall Council"},
  {value:"Coventry City Council",label:"Coventry City Council"},
  {value:"Darlington Borough Council",label:"Darlington Borough Council"},
  {value:"Doncaster Metropolitan Borough Council",label:"Doncaster Metropolitan Borough Council"},
  {value:"Dudley Metropolitan Borough Council",label:"Dudley Metropolitan Borough Council"},
  {value:"Durham County Council",label:"Durham County Council"},
  {value:"East Riding of Yorkshire Council",label:"East Riding of Yorkshire Council"},
  {value:"Gateshead Metropolitan Borough Council",label:"Gateshead Metropolitan Borough Council"},
  {value:"Greater London Authority",label:"Greater London Authority"},
  {value:"Halton Borough Council",label:"Halton Borough Council"},
  {value:"Herefordshire Council",label:"Herefordshire Council"},
  {value:"Hartlepool Borough Council",label:"Hartlepool Borough Council"},
  {value:"Council of the Isles of Scilly",label:"Council of the Isles of Scilly"},
  {value:"Isle of Wight Council",label:"Isle of Wight Council"},
  {value:"Hull City Council",label:"Hull City Council"},
  {value:"Kirklees Council",label:"Kirklees Council"},
  {value:"Knowsley Metropolitan Borough Council",label:"Knowsley Metropolitan Borough Council"},
  {value:"Leicester City Council",label:"Leicester City Council"},
  {value:"Leeds City Council",label:"Leeds City Council"},
  {value:"Liverpool City Council",label:"Liverpool City Council"},
  {value:"City of London Corporation",label:"City of London Corporation"},
  {value:"Luton Borough Council",label:"Luton Borough Council"},
  {value:"Manchester City Council",label:"Manchester City Council"},
  {value:"Middlesbrough Borough Council",label:"Middlesbrough Borough Council"},
  {value:"Medway Council",label:"Medway Council"},
  {value:"Milton Keynes Council",label:"Milton Keynes Council"},
  {value:"Northumberland County Council",label:"Northumberland County Council"},
  {value:"North East Lincolnshire Council",label:"North East Lincolnshire Council"},
  {value:"Newcastle City Council",label:"Newcastle City Council"},
  {value:"Nottingham City Council",label:"Nottingham City Council"},
  {value:"North Lincolnshire Council",label:"North Lincolnshire Council"},
  {value:"North Somerset Council",label:"North Somerset Council"},
  {value:"North Tyneside Council",label:"North Tyneside Council"},
  {value:"Oldham Metropolitan Borough Council",label:"Oldham Metropolitan Borough Council"},
  {value:"Plymouth City Council",label:"Plymouth City Council"},
  {value:"Portsmouth City Council",label:"Portsmouth City Council"},
  {value:"Peterborough City Council",label:"Peterborough City Council"},
  {value:"Redcar and Cleveland Borough Council",label:"Redcar and Cleveland Borough Council"},
  {value:"Rochdale Metropolitan Borough Council",label:"Rochdale Metropolitan Borough Council"},
  {value:"Reading Borough Council",label:"Reading Borough Council"},
  {value:"Rotherham Metropolitan Borough Council",label:"Rotherham Metropolitan Borough Council"},
  {value:"Rutland County Council",label:"Rutland County Council"},
  {value:"Sandwell Metropolitan Borough Council",label:"Sandwell Metropolitan Borough Council"},
  {value:"Sefton Metropolitan Borough Council",label:"Sefton Metropolitan Borough Council"},
  {value:"South Gloucestershire Council",label:"South Gloucestershire Council"},
  {value:"Sheffield City Council",label:"Sheffield City Council"},
  {value:"St Helens Council",label:"St Helens Council"},
  {value:"Shropshire Council",label:"Shropshire Council"},
  {value:"Stockport Metropolitan Borough Council",label:"Stockport Metropolitan Borough Council"},
  {value:"Salford City Council",label:"Salford City Council"},
  {value:"Slough Borough Council",label:"Slough Borough Council"},
  {value:"Sunderland City Council",label:"Sunderland City Council"},
  {value:"Solihull Metropolitan Borough Council",label:"Solihull Metropolitan Borough Council"},
  {value:"Southend-on-Sea Borough Council",label:"Southend-on-Sea Borough Council"},
  {value:"Stoke-on-Trent City Council",label:"Stoke-on-Trent City Council"},
  {value:"Southampton City Council",label:"Southampton City Council"},
  {value:"Stockton-on-Tees Borough Council",label:"Stockton-on-Tees Borough Council"},
  {value:"South Tyneside Council",label:"South Tyneside Council"},
  {value:"Swindon Borough Council",label:"Swindon Borough Council"},
  {value:"Tameside Metropolitan Borough Council",label:"Tameside Metropolitan Borough Council"},
  {value:"Telford & Wrekin Council",label:"Telford & Wrekin Council"},
  {value:"Thurrock Council",label:"Thurrock Council"},
  {value:"Torbay Council",label:"Torbay Council"},
  {value:"Trafford Metropolitan Borough Council",label:"Trafford Metropolitan Borough Council"},
  {value:"West Berkshire Council",label:"West Berkshire Council"},
  {value:"Wigan Metropolitan Borough Council",label:"Wigan Metropolitan Borough Council"},
  {value:"Wiltshire Council",label:"Wiltshire Council"},
  {value:"Wakefield Metropolitan District Council",label:"Wakefield Metropolitan District Council"},
  {value:"Walsall Metropolitan Borough Council",label:"Walsall Metropolitan Borough Council"},
  {value:"City of Wolverhampton Council",label:"City of Wolverhampton Council"},
  {value:"Royal Borough of Windsor and Maidenhead",label:"Royal Borough of Windsor and Maidenhead"},
  {value:"Wokingham Borough Council",label:"Wokingham Borough Council"},
  {value:"Wirral Borough Council",label:"Wirral Borough Council"},
  {value:"Warrington Borough Council",label:"Warrington Borough Council"},
  {value:"City of York Council",label:"City of York Council"},
  {value:"Buckinghamshire County Council",label:"Buckinghamshire County Council"},
  {value:"Aylesbury Vale District Council",label:"Aylesbury Vale District Council"},
  {value:"Chiltern District Council",label:"Chiltern District Council"},
  {value:"South Bucks District Council",label:"South Bucks District Council"},
  {value:"Wycombe District Council",label:"Wycombe District Council"},
  {value:"Cambridgeshire County Council",label:"Cambridgeshire County Council"},
  {value:"Cambridge City Council",label:"Cambridge City Council"},
  {value:"East Cambridgeshire District Council",label:"East Cambridgeshire District Council"},
  {value:"Fenland District Council",label:"Fenland District Council"},
  {value:"Huntingdonshire District Council",label:"Huntingdonshire District Council"},
  {value:"South Cambridgeshire District Council",label:"South Cambridgeshire District Council"},
  {value:"Cumbria County Council",label:"Cumbria County Council"},
  {value:"Allerdale Borough Council",label:"Allerdale Borough Council"},
  {value:"Barrow-in-Furness Borough Council",label:"Barrow-in-Furness Borough Council"},
  {value:"Carlisle City Council",label:"Carlisle City Council"},
  {value:"Copeland Borough Council",label:"Copeland Borough Council"},
  {value:"Eden District Council",label:"Eden District Council"},
  {value:"South Lakeland District Council",label:"South Lakeland District Council"},
  {value:"Derby City Council",label:"Derby City Council"},
  {value:"Derbyshire County Council",label:"Derbyshire County Council"},
  {value:"Amber Valley Borough Council",label:"Amber Valley Borough Council"},
  {value:"Bolsover District Council",label:"Bolsover District Council"},
  {value:"Chesterfield Borough Council",label:"Chesterfield Borough Council"},
  {value:"Derbyshire Dales District Council",label:"Derbyshire Dales District Council"},
  {value:"Erewash Borough Council",label:"Erewash Borough Council"},
  {value:"High Peak Borough Council",label:"High Peak Borough Council"},
  {value:"North East Derbyshire District Council",label:"North East Derbyshire District Council"},
  {value:"South Derbyshire District Council",label:"South Derbyshire District Council"},
  {value:"Devon County Council",label:"Devon County Council"},
  {value:"East Devon District Council",label:"East Devon District Council"},
  {value:"Exeter City Council",label:"Exeter City Council"},
  {value:"Mid Devon District Council",label:"Mid Devon District Council"},
  {value:"North Devon District Council",label:"North Devon District Council"},
  {value:"South Hams District Council",label:"South Hams District Council"},
  {value:"Teignbridge District Council",label:"Teignbridge District Council"},
  {value:"Torridge District Council",label:"Torridge District Council"},
  {value:"West Devon Borough Council",label:"West Devon Borough Council"},
  {value:"Dorset County Council",label:"Dorset County Council"},
  {value:"East Dorset District Council",label:"East Dorset District Council"},
  {value:"North Dorset District Council",label:"North Dorset District Council"},
  {value:"Purbeck District Council",label:"Purbeck District Council"},
  {value:"West Dorset District Council",label:"West Dorset District Council"},
  {value:"Weymouth and Portland Borough Council",label:"Weymouth and Portland Borough Council"},
  {value:"Essex County Council",label:"Essex County Council"},
  {value:"Basildon Borough Council",label:"Basildon Borough Council"},
  {value:"Braintree District Council",label:"Braintree District Council"},
  {value:"Brentwood Borough Council",label:"Brentwood Borough Council"},
  {value:"Castle Point Borough Council",label:"Castle Point Borough Council"},
  {value:"Chelmsford City Council",label:"Chelmsford City Council"},
  {value:"Colchester Borough Council",label:"Colchester Borough Council"},
  {value:"Epping Forest District Council",label:"Epping Forest District Council"},
  {value:"Harlow District Council",label:"Harlow District Council"},
  {value:"Maldon District Council",label:"Maldon District Council"},
  {value:"Rochford District Council",label:"Rochford District Council"},
  {value:"Tendring District Council",label:"Tendring District Council"},
  {value:"Uttlesford District Council",label:"Uttlesford District Council"},
  {value:"East Sussex County Council",label:"East Sussex County Council"},
  {value:"Eastbourne Borough Council",label:"Eastbourne Borough Council"},
  {value:"Hastings Borough Council",label:"Hastings Borough Council"},
  {value:"Lewes District Council",label:"Lewes District Council"},
  {value:"Rother District Council",label:"Rother District Council"},
  {value:"Wealden District Council",label:"Wealden District Council"},
  {value:"London Borough of Barking and Dagenham",label:"London Borough of Barking and Dagenham"},
  {value:"London Borough of Brent",label:"London Borough of Brent"},
  {value:"London Borough of Bexley",label:"London Borough of Bexley"},
  {value:"London Borough of Barnet",label:"London Borough of Barnet"},
  {value:"London Borough of Bromley",label:"London Borough of Bromley"},
  {value:"London Borough of Camden",label:"London Borough of Camden"},
  {value:"London Borough of Croydon",label:"London Borough of Croydon"},
  {value:"London Borough of Ealing",label:"London Borough of Ealing"},
  {value:"London Borough of Enfield",label:"London Borough of Enfield"},
  {value:"Royal Borough of Greenwich",label:"Royal Borough of Greenwich"},
  {value:"London Borough of Havering",label:"London Borough of Havering"},
  {value:"London Borough of Hackney",label:"London Borough of Hackney"},
  {value:"London Borough of Hillingdon",label:"London Borough of Hillingdon"},
  {value:"London Borough of Hammersmith & Fulham",label:"London Borough of Hammersmith & Fulham"},
  {value:"London Borough of Hounslow",label:"London Borough of Hounslow"},
  {value:"London Borough of Harrow",label:"London Borough of Harrow"},
  {value:"London Borough of Haringey",label:"London Borough of Haringey"},
  {value:"London Borough of Islington",label:"London Borough of Islington"},
  {value:"Royal Borough of Kensington and Chelsea",label:"Royal Borough of Kensington and Chelsea"},
  {value:"Royal Borough of Kingston upon Thames",label:"Royal Borough of Kingston upon Thames"},
  {value:"London Borough of Lambeth",label:"London Borough of Lambeth"},
  {value:"London Borough of Lewisham",label:"London Borough of Lewisham"},
  {value:"London Borough of Merton",label:"London Borough of Merton"},
  {value:"London Borough of Newham",label:"London Borough of Newham"},
  {value:"London Borough of Redbridge",label:"London Borough of Redbridge"},
  {value:"London Borough of Richmond upon Thames",label:"London Borough of Richmond upon Thames"},
  {value:"London Borough of Sutton",label:"London Borough of Sutton"},
  {value:"London Borough of Southwark",label:"London Borough of Southwark"},
  {value:"London Borough of Tower Hamlets",label:"London Borough of Tower Hamlets"},
  {value:"London Borough of Waltham Forest",label:"London Borough of Waltham Forest"},
  {value:"London Borough of Wandsworth",label:"London Borough of Wandsworth"},
  {value:"City of Westminster",label:"City of Westminster"},
  {value:"Gloucestershire County Council",label:"Gloucestershire County Council"},
  {value:"Cheltenham Borough Council",label:"Cheltenham Borough Council"},
  {value:"Cotswold District Council",label:"Cotswold District Council"},
  {value:"Forest of Dean District Council",label:"Forest of Dean District Council"},
  {value:"Gloucester City Council",label:"Gloucester City Council"},
  {value:"Stroud District Council",label:"Stroud District Council"},
  {value:"Tewkesbury Borough Council",label:"Tewkesbury Borough Council"},
  {value:"Hampshire County Council",label:"Hampshire County Council"},
  {value:"Basingstoke and Deane Borough Council",label:"Basingstoke and Deane Borough Council"},
  {value:"East Hampshire District Council",label:"East Hampshire District Council"},
  {value:"Eastleigh Borough Council",label:"Eastleigh Borough Council"},
  {value:"Fareham Borough Council",label:"Fareham Borough Council"},
  {value:"Gosport Borough Council",label:"Gosport Borough Council"},
  {value:"Hart District Council",label:"Hart District Council"},
  {value:"Havant Borough Council",label:"Havant Borough Council"},
  {value:"New Forest District Council",label:"New Forest District Council"},
  {value:"Rushmoor Borough Council",label:"Rushmoor Borough Council"},
  {value:"Test Valley Borough Council",label:"Test Valley Borough Council"},
  {value:"Winchester City Council",label:"Winchester City Council"},
  {value:"Hertfordshire County Council",label:"Hertfordshire County Council"},
  {value:"Broxbourne Borough Council",label:"Broxbourne Borough Council"},
  {value:"Dacorum Borough Council",label:"Dacorum Borough Council"},
  {value:"East Hertfordshire District Council",label:"East Hertfordshire District Council"},
  {value:"Hertsmere Borough Council",label:"Hertsmere Borough Council"},
  {value:"North Hertfordshire District Council",label:"North Hertfordshire District Council"},
  {value:"St Albans City and District Council",label:"St Albans City and District Council"},
  {value:"Stevenage Borough Council",label:"Stevenage Borough Council"},
  {value:"Three Rivers District Council",label:"Three Rivers District Council"},
  {value:"Watford Borough Council",label:"Watford Borough Council"},
  {value:"Welwyn Hatfield Borough Council",label:"Welwyn Hatfield Borough Council"},
  {value:"Kent County Council",label:"Kent County Council"},
  {value:"Ashford Borough Council",label:"Ashford Borough Council"},
  {value:"Canterbury City Council",label:"Canterbury City Council"},
  {value:"Dartford Borough Council",label:"Dartford Borough Council"},
  {value:"Dover District Council",label:"Dover District Council"},
  {value:"Gravesham Borough Council",label:"Gravesham Borough Council"},
  {value:"Maidstone Borough Council",label:"Maidstone Borough Council"},
  {value:"Sevenoaks District Council",label:"Sevenoaks District Council"},
  {value:"Folkestone and Hythe Council",label:"Folkestone and Hythe Council"},
  {value:"Swale Borough Council",label:"Swale Borough Council"},
  {value:"Thanet District Council",label:"Thanet District Council"},
  {value:"Tonbridge and Malling Borough Council",label:"Tonbridge and Malling Borough Council"},
  {value:"Tunbridge Wells Borough Council",label:"Tunbridge Wells Borough Council"},
  {value:"Lancashire County Council",label:"Lancashire County Council"},
  {value:"Burnley Borough Council",label:"Burnley Borough Council"},
  {value:"Chorley Borough Council",label:"Chorley Borough Council"},
  {value:"Fylde Borough Council",label:"Fylde Borough Council"},
  {value:"Hyndburn Borough Council",label:"Hyndburn Borough Council"},
  {value:"Lancaster City Council",label:"Lancaster City Council"},
  {value:"Pendle Borough Council",label:"Pendle Borough Council"},
  {value:"Preston City Council",label:"Preston City Council"},
  {value:"Ribble Valley Borough Council",label:"Ribble Valley Borough Council"},
  {value:"Rossendale Borough Council",label:"Rossendale Borough Council"},
  {value:"South Ribble Borough Council",label:"South Ribble Borough Council"},
  {value:"West Lancashire Borough Council",label:"West Lancashire Borough Council"},
  {value:"Wyre Borough Council",label:"Wyre Borough Council"},
  {value:"Leicestershire County Council",label:"Leicestershire County Council"},
  {value:"Blaby District Council",label:"Blaby District Council"},
  {value:"Charnwood Borough Council",label:"Charnwood Borough Council"},
  {value:"Harborough District Council",label:"Harborough District Council"},
  {value:"Hinckley and Bosworth Borough Council",label:"Hinckley and Bosworth Borough Council"},
  {value:"Melton Borough Council",label:"Melton Borough Council"},
  {value:"North West Leicestershire District Council",label:"North West Leicestershire District Council"},
  {value:"Oadby and Wigston Borough Council",label:"Oadby and Wigston Borough Council"},
  {value:"Lincolnshire County Council",label:"Lincolnshire County Council"},
  {value:"Boston Borough Council",label:"Boston Borough Council"},
  {value:"East Lindsey District Council",label:"East Lindsey District Council"},
  {value:"City of Lincoln Council",label:"City of Lincoln Council"},
  {value:"North Kesteven District Council",label:"North Kesteven District Council"},
  {value:"South Holland District Council",label:"South Holland District Council"},
  {value:"South Kesteven District Council",label:"South Kesteven District Council"},
  {value:"West Lindsey District Council",label:"West Lindsey District Council"},
  {value:"Norfolk County Council",label:"Norfolk County Council"},
  {value:"Breckland District Council",label:"Breckland District Council"},
  {value:"Broadland District Council",label:"Broadland District Council"},
  {value:"Great Yarmouth Borough Council",label:"Great Yarmouth Borough Council"},
  {value:"Borough Council of King's Lynn and West Norfolk",label:"Borough Council of King's Lynn and West Norfolk"},
  {value:"North Norfolk District Council",label:"North Norfolk District Council"},
  {value:"Norwich City Council",label:"Norwich City Council"},
  {value:"South Norfolk District Council",label:"South Norfolk District Council"},
  {value:"Northamptonshire County Council",label:"Northamptonshire County Council"},
  {value:"Corby Borough Council",label:"Corby Borough Council"},
  {value:"Daventry District Council",label:"Daventry District Council"},
  {value:"East Northamptonshire Council",label:"East Northamptonshire Council"},
  {value:"Kettering Borough Council",label:"Kettering Borough Council"},
  {value:"Northampton Borough Council",label:"Northampton Borough Council"},
  {value:"South Northamptonshire Council",label:"South Northamptonshire Council"},
  {value:"Wellingborough Borough Council",label:"Wellingborough Borough Council"},
  {value:"Nottinghamshire County Council",label:"Nottinghamshire County Council"},
  {value:"Ashfield District Council",label:"Ashfield District Council"},
  {value:"Bassetlaw District Council",label:"Bassetlaw District Council"},
  {value:"Broxtowe Borough Council",label:"Broxtowe Borough Council"},
  {value:"Gedling Borough Council",label:"Gedling Borough Council"},
  {value:"Mansfield District Council",label:"Mansfield District Council"},
  {value:"Newark and Sherwood District Council",label:"Newark and Sherwood District Council"},
  {value:"Rushcliffe Borough Council",label:"Rushcliffe Borough Council"},
  {value:"North Yorkshire County Council",label:"North Yorkshire County Council"},
  {value:"Craven District Council",label:"Craven District Council"},
  {value:"Hambleton District Council",label:"Hambleton District Council"},
  {value:"Harrogate Borough Council",label:"Harrogate Borough Council"},
  {value:"Richmondshire District Council",label:"Richmondshire District Council"},
  {value:"Ryedale District Council",label:"Ryedale District Council"},
  {value:"Scarborough Borough Council",label:"Scarborough Borough Council"},
  {value:"Selby District Council",label:"Selby District Council"},
  {value:"Oxfordshire County Council",label:"Oxfordshire County Council"},
  {value:"Cherwell District Council",label:"Cherwell District Council"},
  {value:"Oxford City Council",label:"Oxford City Council"},
  {value:"South Oxfordshire District Council",label:"South Oxfordshire District Council"},
  {value:"Vale of White Horse District Council",label:"Vale of White Horse District Council"},
  {value:"West Oxfordshire District Council",label:"West Oxfordshire District Council"},
  {value:"Suffolk County Council",label:"Suffolk County Council"},
  {value:"Babergh District Council",label:"Babergh District Council"},
  {value:"Forest Heath District Council",label:"Forest Heath District Council"},
  {value:"Ipswich Borough Council",label:"Ipswich Borough Council"},
  {value:"Mid Suffolk District Council",label:"Mid Suffolk District Council"},
  {value:"St Edmundsbury Borough Council",label:"St Edmundsbury Borough Council"},
  {value:"Suffolk Coastal District Council",label:"Suffolk Coastal District Council"},
  {value:"Waveney District Council",label:"Waveney District Council"},
  {value:"Somerset County Council",label:"Somerset County Council"},
  {value:"Mendip District Council",label:"Mendip District Council"},
  {value:"Sedgemoor District Council",label:"Sedgemoor District Council"},
  {value:"South Somerset District Council",label:"South Somerset District Council"},
  {value:"Taunton Deane Borough Council",label:"Taunton Deane Borough Council"},
  {value:"West Somerset District Council",label:"West Somerset District Council"},
  {value:"Surrey County Council",label:"Surrey County Council"},
  {value:"Elmbridge Borough Council",label:"Elmbridge Borough Council"},
  {value:"Epsom and Ewell Borough Council",label:"Epsom and Ewell Borough Council"},
  {value:"Guildford Borough Council",label:"Guildford Borough Council"},
  {value:"Mole Valley District Council",label:"Mole Valley District Council"},
  {value:"Reigate and Banstead Borough Council",label:"Reigate and Banstead Borough Council"},
  {value:"Runnymede Borough Council",label:"Runnymede Borough Council"},
  {value:"Spelthorne Borough Council",label:"Spelthorne Borough Council"},
  {value:"Surrey Heath Borough Council",label:"Surrey Heath Borough Council"},
  {value:"Tandridge District Council",label:"Tandridge District Council"},
  {value:"Waverley Borough Council",label:"Waverley Borough Council"},
  {value:"Woking Borough Council",label:"Woking Borough Council"},
  {value:"Staffordshire County Council",label:"Staffordshire County Council"},
  {value:"Cannock Chase District Council",label:"Cannock Chase District Council"},
  {value:"East Staffordshire Borough Council",label:"East Staffordshire Borough Council"},
  {value:"Lichfield District Council",label:"Lichfield District Council"},
  {value:"Newcastle-under-Lyme Borough Council",label:"Newcastle-under-Lyme Borough Council"},
  {value:"South Staffordshire Council",label:"South Staffordshire Council"},
  {value:"Stafford Borough Council",label:"Stafford Borough Council"},
  {value:"Staffordshire Moorlands District Council",label:"Staffordshire Moorlands District Council"},
  {value:"Tamworth Borough Council",label:"Tamworth Borough Council"},
  {value:"Warwickshire County Council",label:"Warwickshire County Council"},
  {value:"North Warwickshire Borough Council",label:"North Warwickshire Borough Council"},
  {value:"Nuneaton and Bedworth Borough Council",label:"Nuneaton and Bedworth Borough Council"},
  {value:"Rugby Borough Council",label:"Rugby Borough Council"},
  {value:"Stratford-on-Avon District Council",label:"Stratford-on-Avon District Council"},
  {value:"Warwick District Council",label:"Warwick District Council"},
  {value:"Worcestershire County Council",label:"Worcestershire County Council"},
  {value:"Bromsgrove District Council",label:"Bromsgrove District Council"},
  {value:"Malvern Hills District Council",label:"Malvern Hills District Council"},
  {value:"Redditch Borough Council",label:"Redditch Borough Council"},
  {value:"Worcester City Council",label:"Worcester City Council"},
  {value:"Wychavon District Council",label:"Wychavon District Council"},
  {value:"Wyre Forest District Council",label:"Wyre Forest District Council"},
  {value:"West Sussex County Council",label:"West Sussex County Council"},
  {value:"Adur District Council",label:"Adur District Council"},
  {value:"Arun District Council",label:"Arun District Council"},
  {value:"Chichester District Council",label:"Chichester District Council"},
  {value:"Crawley Borough Council",label:"Crawley Borough Council"},
  {value:"Horsham District Council",label:"Horsham District Council"},
  {value:"Mid Sussex District Council",label:"Mid Sussex District Council"},
  {value:"Worthing Borough Council",label:"Worthing Borough Council"},
  {value:"Liverpool City Region",label:"Liverpool City Region"},
  {value:"Sheffield City Region",label:"Sheffield City Region"},
  {value:"West of England Combined Authority",label:"West of England Combined Authority"},
  {value:"Greater Manchester Combined Authority",label:"Greater Manchester Combined Authority"},
  {value:"West Midlands Combined Authority",label:"West Midlands Combined Authority"},
  {value:"Cambridgeshire and Peterborough Combined Authority",label:"Cambridgeshire and Peterborough Combined Authority"},
  {value:"Tees Valley Combined Authority",label:"Tees Valley Combined Authority"},
  {value:"East Suffolk Council",label:"East Suffolk Council"},
  {value:"West Suffolk Council",label:"West Suffolk Council"},
  {value:"Somerset West and Taunton Council",label:"Somerset West and Taunton Council"},
  {value:"Dorset Council",label:"Dorset Council"},
  {value:"Bournemouth, Christchurch and Poole Council",label:"Bournemouth, Christchurch and Poole Council"},
  {value:"Ards and North Down Borough Council",label:"Ards and North Down Borough Council"},
  {value:"Antrim and Newtonabbey Borough Council",label:"Antrim and Newtonabbey Borough Council"},
  {value:"Lisburn and Castlereagh City Council",label:"Lisburn and Castlereagh City Council"},
  {value:"Newry, Mourne and Down District Council",label:"Newry, Mourne and Down District Council"},
  {value:"Armagh City, Banbridge and Craigavon Borough Council",label:"Armagh City, Banbridge and Craigavon Borough Council"},
  {value:"Fermanagh and Omagh District Council",label:"Fermanagh and Omagh District Council"},
  {value:"Derry City and Strabane District Council",label:"Derry City and Strabane District Council"},
  {value:"Mid Ulster District Council",label:"Mid Ulster District Council"},
  {value:"Mid & East Antrim Borough Council",label:"Mid & East Antrim Borough Council"},
  {value:"Causeway Coast and Glens Borough Council",label:"Causeway Coast and Glens Borough Council"},
  {value:"Belfast City Council",label:"Belfast City Council"},
  {value:"Aberdeenshire Council",label:"Aberdeenshire Council"},
  {value:"Aberdeen City Council",label:"Aberdeen City Council"},
  {value:"Argyll and Bute Council",label:"Argyll and Bute Council"},
  {value:"Angus Council",label:"Angus Council"},
  {value:"Clackmannanshire Council",label:"Clackmannanshire Council"},
  {value:"Dumfries and Galloway Council",label:"Dumfries and Galloway Council"},
  {value:"Dundee City Council",label:"Dundee City Council"},
  {value:"East Ayrshire Council",label:"East Ayrshire Council"},
  {value:"City of Edinburgh Council",label:"City of Edinburgh Council"},
  {value:"East Dunbartonshire Council",label:"East Dunbartonshire Council"},
  {value:"East Lothian Council",label:"East Lothian Council"},
  {value:"Comhairle nan Eilean Siar",label:"Comhairle nan Eilean Siar"},
  {value:"East Renfrewshire Council",label:"East Renfrewshire Council"},
  {value:"Falkirk Council",label:"Falkirk Council"},
  {value:"Fife Council",label:"Fife Council"},
  {value:"Glasgow City Council",label:"Glasgow City Council"},
  {value:"Highland Council",label:"Highland Council"},
  {value:"Inverclyde Council",label:"Inverclyde Council"},
  {value:"Midlothian Council",label:"Midlothian Council"},
  {value:"Moray Council",label:"Moray Council"},
  {value:"North Ayrshire Council",label:"North Ayrshire Council"},
  {value:"North Lanarkshire Council",label:"North Lanarkshire Council"},
  {value:"Orkney Islands Council",label:"Orkney Islands Council"},
  {value:"Perth and Kinross Council",label:"Perth and Kinross Council"},
  {value:"Renfrewshire Council",label:"Renfrewshire Council"},
  {value:"South Ayrshire Council",label:"South Ayrshire Council"},
  {value:"Scottish Borders Council",label:"Scottish Borders Council"},
  {value:"South Lanarkshire Council",label:"South Lanarkshire Council"},
  {value:"Stirling Council",label:"Stirling Council"},
  {value:"West Dunbartonshire Council",label:"West Dunbartonshire Council"},
  {value:"West Lothian Council",label:"West Lothian Council"},
  {value:"Shetland Islands Council",label:"Shetland Islands Council"},
  {value:"Isle of Anglesey County Council",label:"Isle of Anglesey County Council"},
  {value:"Bridgend County Borough Council",label:"Bridgend County Borough Council"},
  {value:"Blaenau Gwent County Borough Council",label:"Blaenau Gwent County Borough Council"},
  {value:"Caerphilly County Borough Council",label:"Caerphilly County Borough Council"},
  {value:"Ceredigion County Council",label:"Ceredigion County Council"},
  {value:"Carmarthenshire County Council",label:"Carmarthenshire County Council"},
  {value:"City of Cardiff Council",label:"City of Cardiff Council"},
  {value:"Conwy County Borough Council",label:"Conwy County Borough Council"},
  {value:"Denbighshire County Council",label:"Denbighshire County Council"},
  {value:"Flintshire County Council",label:"Flintshire County Council"},
  {value:"Gwynedd Council",label:"Gwynedd Council"},
  {value:"Monmouthshire County Council",label:"Monmouthshire County Council"},
  {value:"Merthyr Tydfil County Borough Council",label:"Merthyr Tydfil County Borough Council"},
  {value:"Neath Port Talbot County Borough Council",label:"Neath Port Talbot County Borough Council"},
  {value:"Newport City Council",label:"Newport City Council"},
  {value:"Pembrokeshire County Council",label:"Pembrokeshire County Council"},
  {value:"Powys County Council",label:"Powys County Council"},
  {value:"Rhondda Cynon Taf County Borough Council",label:"Rhondda Cynon Taf County Borough Council"},
  {value:"City and County of Swansea Council",label:"City and County of Swansea Council"},
  {value:"Torfaen County Borough Council",label:"Torfaen County Borough Council"},
  {value:"Vale of Glamorgan Council",label:"Vale of Glamorgan Council"},
  {value:"Wrexham County Borough Council",label:"Wrexham County Borough Council"},
  {value:"Belfast Harbour Police",label:"Belfast Harbour Police"},
  {value:"Belfast International Airport Constabulary",label:"Belfast International Airport Constabulary"},
  {value:"North East Regional Special Operations Unit",label:"North East Regional Special Operations Unit"},
  {value:"North West Regional Organised Crime Unit",label:"North West Regional Organised Crime Unit"},
  {value:"Yorkshire and Humber Regional Organised Crime Unit",label:"Yorkshire and Humber Regional Organised Crime Unit"},
  {value:"East Midlands Special Operations Unit",label:"East Midlands Special Operations Unit"},
  {value:"Eastern Region Special Operations Unit",label:"Eastern Region Special Operations Unit"},
  {value:"West Midlands Regional Organised Crime Unit",label:"West Midlands Regional Organised Crime Unit"},
  {value:"Tarian ROCU",label:"Tarian ROCU"},
  {value:"South East Regional Organised Crime Unit",label:"South East Regional Organised Crime Unit"},
  {value:"South West Regional Organised Crime Unit",label:"South West Regional Organised Crime Unit"},
  {value:"Belfast and Lisburn Women's Aid", label:"Belfast and Lisburn Women's Aid"},
  {value: "Refugee Council", label:"Refugee Council"},
  {value: "Youth Work Alliance", label:"Youth Work Alliance"}
];

module.exports = organisations;
