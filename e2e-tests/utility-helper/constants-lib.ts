export class ConstantsLib {
    static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
    static readonly ORGANISATION = 'Furness Borough Council';
    static readonly LOCAL_AUTHORITY = 'Preston City Council';
    static readonly LOCAL_AUTHORITY_PHONE = '02012345678';
    static readonly LOCAL_AUTHORITY_EMAIL = 'abc@email.com';
    static readonly LOCAL_AUTHORITY_FIRST_NAME = 'fName';
    static readonly LOCAL_AUTHORITY_LAST_NAME = 'lName';
    static readonly POLICE_FORCE = 'City of London Police';
    static readonly CRIME_REFERENCE = 'Ref Text';
    static readonly REFERENCE_PREFIX = 'NRM-E2E';
    static readonly TEXT_ANSWER = 'NRM automated test response';
    static readonly EMAIL_ANSWER = 'contact@info.com';
    static readonly CONTACT_DETAILS_TEXT = 'Text';
    static readonly CONTACT_DETAILS_PHONE = '02012345678';
    static readonly DOB_DAY = '01';
    static readonly DOB_MONTH = '01';
    static readonly DOB_YEAR = '2000';
    static readonly VICTIM_FIRST_NAME = 'firstname';
    static readonly VICTIM_LAST_NAME = 'lastname';
    static readonly VICTIM_NICKNAME = 'nickname';
    static readonly GENDER = 'Female';
    static readonly NATIONALITY = 'British';
    static readonly SECOND_NATIONALITY = 'Belgian';
    static readonly DECISION_RECIPIENT = 'Potential victim';
    static readonly ALTERNATE_DECISION_RECIPIENT = 'Someone else';
    static readonly DECISION_CONTACT_EMAIL = 'email@abc.com';
    static readonly CONTACT_ADDRESS_TEXT = 'Text';
    static readonly CONTACT_NAME_TEXT = 'Text input';
    static readonly UK_CITY = 'Bath';
    static readonly UK_REGION = 'Angus';
    static readonly UNKNOWN = 'Unknown';
    static readonly OVERSEAS_COUNTRY = 'Cuba';
    static readonly LOCATION_DETAILS = 'Text';
    static readonly OVERSEAS_LOCATION_DETAILS = 'Text input';
    static readonly OTHER_EXPLOITATION_DETAILS = 'Text';
    static readonly WHY_NOT_REFER_DETAILS = 'case referred';
    static readonly SAVE_AND_EXIT = 'Save and exit';
    static readonly YES = 'Yes';
    static readonly NO = 'No';
    static readonly NOT_SURE = 'Not sure';
    static readonly EXPLOITATION_TYPE_PATTERNS = [
        /^Forced to work/,
        /^Wages taken by force/,
        /^Forced to commit fraud/,
        /^Forced into prostitution/,
        /^Child sexual exploitation/,
        /^Taken somewhere/,
        /^Forced to commit a crime/,
        /^Organs/,
        /^Forced to do unpaid/,
        /^Other$/,
    ] as const;
}


function requiredEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
}