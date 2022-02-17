import { getImporterUser, LfSamlTokenAttributes, parseAttributesFromSamlToken, SamlTokenAttributeNames } from './saml-token-utils';

describe('SamlTokenUtils', () => {
    it('adds trusteeId to samlTokenAttributes if it exists', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
          <Attribute Name="http://laserfiche.com/identity/claims/catalyst/trusteeid">
            <AttributeValue>1042</AttributeValue>
          </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes: LfSamlTokenAttributes | undefined = parseAttributesFromSamlToken(samlToken);
        const trusteeId = samlTokenAttributes?.[SamlTokenAttributeNames.TRUSTEE_ID];

        // Assert
        expect(samlTokenAttributes).toBeDefined();
        expect(trusteeId).toBeDefined();
        expect(trusteeId?.length).toEqual(1);
        expect(trusteeId![0]).toEqual('1042');
    });

    it('does not add trusteeId to samlTokenAttributes if it does not exist', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
            <Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname">
                <AttributeValue>Squarepants</AttributeValue>
            </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes: LfSamlTokenAttributes | undefined = parseAttributesFromSamlToken(samlToken);
        const trusteeId = samlTokenAttributes?.[SamlTokenAttributeNames.TRUSTEE_ID];

        // Assert
        expect(samlTokenAttributes).toBeDefined();
        expect(trusteeId).toBeUndefined();
    });

    it('does not add trusteeId to samlTokenAttributes if there are no attribute values', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
            <Attribute Name="http://laserfiche.com/identity/claims/catalyst/trusteeid">
            </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes: LfSamlTokenAttributes | undefined = parseAttributesFromSamlToken(samlToken);
        const trusteeId = samlTokenAttributes?.[SamlTokenAttributeNames.TRUSTEE_ID];

        // Assert
        expect(samlTokenAttributes).toBeDefined();
        expect(trusteeId).toBeUndefined();
    });

    it('importerUser is username if available in saml token', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
        <Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name">
          <AttributeValue>Spongebob Squarepants</AttributeValue>
        </Attribute>
        <Attribute Name="http://laserfiche.com/identity/claims/catalyst/username">
            <AttributeValue>spongebob.squarepants</AttributeValue>
        </Attribute>
        <Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress">
          <AttributeValue>spongebob.squarepants@bikini-bottom.gov</AttributeValue>
        </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes = parseAttributesFromSamlToken(samlToken);
        const importerUser: string | undefined = getImporterUser(samlTokenAttributes);

        // Assert
        expect(importerUser).toEqual('spongebob.squarepants');
    });

    it('importerUser is emailaddress if username is not available in saml token', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
        <Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name">
          <AttributeValue>Spongebob Squarepants</AttributeValue>
        </Attribute>
        <Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress">
          <AttributeValue>spongebob.squarepants@bikini-bottom.gov</AttributeValue>
        </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes = parseAttributesFromSamlToken(samlToken);
        const importerUser: string | undefined = getImporterUser(samlTokenAttributes);

        // Assert
        expect(importerUser).toEqual('spongebob.squarepants@bikini-bottom.gov');
    });

    it('importerUser is name if username and emailaddress are both not available in saml token', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
        <Attribute Name="http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name">
          <AttributeValue>Spongebob Squarepants</AttributeValue>
        </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes = parseAttributesFromSamlToken(samlToken);
        const importerUser: string | undefined = getImporterUser(samlTokenAttributes);

        // Assert
        expect(importerUser).toEqual('Spongebob Squarepants');
    });

    it('importerUser is undefined if name, username, and emailaddress are not available in saml token', () => {
        // Arrange
        const samlToken: string = `<Assertion ID="_7dab6dd5-d01c-422d-aede-2fb7e213f852"
        IssueInstant="2020-10-06T21:36:38.416Z" Version="2.0"
        xmlns="urn:oasis:names:tc:SAML:2.0:assertion">
        <Issuer>https://acs.laserfiche.com/ACS</Issuer>
        <AttributeStatement>
        <Attribute Name="http://laserfiche.com/identity/claims/catalyst/trusteeid">
            <AttributeValue>1042</AttributeValue>
        </Attribute>
        </AttributeStatement>
      </Assertion>`;

        // Act
        const samlTokenAttributes = parseAttributesFromSamlToken(samlToken);
        const importerUser: string | undefined = getImporterUser(samlTokenAttributes);

        // Assert
        expect(importerUser).toBeUndefined();
    });
});
