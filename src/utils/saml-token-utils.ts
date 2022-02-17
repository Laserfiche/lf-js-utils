export enum SamlTokenAttributeNames {
    AWS_REGION = 'http://laserfiche.com/identity/claims/catalyst/awsregion',
    CUSTOMER_ID = 'http://laserfiche.com/identity/claims/catalyst/customerid',
    CUSTOMER_TYPE = 'http://laserfiche.com/identity/claims/catalyst/customertype',
    DISPLAY_NAME = 'http://laserfiche.com/identity/claims/catalyst/displayname',
    FEATURES = 'http://laserfiche.com/identity/claims/catalyst/features',
    GLOBAL_ID = 'http://laserfiche.com/identity/claims/catalyst/globalid',
    GROUPS = 'http://laserfiche.com/identity/claims/catalyst/groups',
    GROUPS_2 = 'http://laserfiche.com/identity/claims/catalyst/groups2',
    IS_FEDERATED_USER = 'http://laserfiche.com/identity/claims/catalyst/isfederateduser',
    ROLES = 'http://laserfiche.com/identity/claims/catalyst/roles',
    TITLE = 'http://laserfiche.com/identity/claims/catalyst/title',
    TRUSTEE_ID = 'http://laserfiche.com/identity/claims/catalyst/trusteeid',
    TRUSTEE_TYPE = 'http://laserfiche.com/identity/claims/catalyst/trusteetype',
    USERNAME = 'http://laserfiche.com/identity/claims/catalyst/username',
    USER_SEATS = 'http://laserfiche.com/identity/claims/catalyst/userseats',
    USER_TYPE = 'http://laserfiche.com/identity/claims/catalyst/usertype',
    EMAIL_ADDRESS = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
    GIVEN_NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
    NAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name',
    SURNAME = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'
}

export class LfSamlTokenAttributes {
    [SamlTokenAttributeNames.AWS_REGION]?: string[];
    [SamlTokenAttributeNames.CUSTOMER_ID]?: string[];
    [SamlTokenAttributeNames.CUSTOMER_TYPE]?: string[];
    [SamlTokenAttributeNames.DISPLAY_NAME]?: string[];
    [SamlTokenAttributeNames.FEATURES]?: string[];
    [SamlTokenAttributeNames.GLOBAL_ID]?: string[];
    [SamlTokenAttributeNames.GROUPS]?: string[];
    [SamlTokenAttributeNames.GROUPS_2]?: string[];
    [SamlTokenAttributeNames.IS_FEDERATED_USER]?: string[];
    [SamlTokenAttributeNames.ROLES]?: string[];
    [SamlTokenAttributeNames.TITLE]?: string[];
    [SamlTokenAttributeNames.TRUSTEE_ID]?: string[];
    [SamlTokenAttributeNames.TRUSTEE_TYPE]?: string[];
    [SamlTokenAttributeNames.USERNAME]?: string[];
    [SamlTokenAttributeNames.USER_SEATS]?: string[];
    [SamlTokenAttributeNames.USER_TYPE]?: string[];
    [SamlTokenAttributeNames.EMAIL_ADDRESS]?: string[];
    [SamlTokenAttributeNames.GIVEN_NAME]?: string[];
    [SamlTokenAttributeNames.NAME]?: string[];
    [SamlTokenAttributeNames.SURNAME]?: string[];
}

export function parseAttributesFromSamlToken(samlToken: string | undefined): LfSamlTokenAttributes | undefined {
    if (!samlToken) {
        return undefined;
    }
    const xmlParser = new DOMParser();
    const xmlDoc = xmlParser.parseFromString(samlToken, 'text/xml');
    const samlTokenAttributes: LfSamlTokenAttributes = {};
    Object.values(SamlTokenAttributeNames).forEach(attributeName => {
        const values: string[] | undefined = getValuesForAttribute(xmlDoc, attributeName);
        if (values) {
            samlTokenAttributes[attributeName] = values;
        }
    });
    return samlTokenAttributes;
}

function getValuesForAttribute(xmlDoc: Document, attributeName: SamlTokenAttributeNames): string[] | undefined {
    const attributeElement = xmlDoc.querySelector(`[Name="${attributeName}"]`);
    const children = attributeElement?.children;
    const numChildren: number = children?.length ?? 0;
    if (numChildren === 0) {
        return undefined;
    }
    const values: string[] = [];
    for (let i = 0; i < numChildren; i++) {
        const attributeValue = children?.item(i)?.textContent ?? undefined;
        if (attributeValue) {
            values.push(attributeValue);
        }
    }
    return values;
}

export function getImporterUser(samlTokenAttributes: LfSamlTokenAttributes | undefined): string | undefined {
    if (samlTokenAttributes) {
        const userNameAttribute = samlTokenAttributes[SamlTokenAttributeNames.USERNAME];
        if (userNameAttribute && userNameAttribute.length > 0) {
            return userNameAttribute[0];
        }
        const emailaddressAttribute = samlTokenAttributes[SamlTokenAttributeNames.EMAIL_ADDRESS];
        if (emailaddressAttribute && emailaddressAttribute.length > 0) {
            return emailaddressAttribute[0];
        }
        const nameAttribute = samlTokenAttributes[SamlTokenAttributeNames.NAME];
        if (nameAttribute && nameAttribute.length > 0) {
            return nameAttribute[0];
        }
    }
}
