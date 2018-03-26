# Implementation Guides

Aqueduct supports integrations by several types of partners. These integrations are supported by the SDK, the member portal, and the REST API/Events API.

# General Guidelines

## Sign up for member portal access

### Visit https://portal.ercdex.com/#/register

Registration requires your personal and company information. A confirmation email will be sent out allowing you to confirm your account.

You may have received an invitation link from an existing partner. Accessing this invitation link will take you through the registration process and confirm the partnership.

## Creating API Keys

API keys are used to identify your account when making API calls using Aqueduct or raw REST API calls. You can create API keys once logged into the portal in Account Admin -> Api Keys -> Create Api Key:

![alt text](./screenshots/api-keys.png)

### Initializing Aqueduct Client with API Key

```
import { Aqueduct } from 'aqueduct';

Aqueduct.Initialize({
    apiKeyId: 'xxxxx'
});
```

### Sending Api Key with Raw Requests

Set request header 'X-API-KEY-ID' to API Key ID.

# Partner Guides

Our partnerships generally fall under a few general groupings. We've created group specific guides to get you started.

- [Affiliate 0x Relayers](./RELAYER.MD)
- [Liquidity Providers/Market Makers](./LIQUIDITY-PARTNER.MD)
