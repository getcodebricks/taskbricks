import jwt from "jsonwebtoken";
import { APIGatewayTokenAuthorizerEvent, APIGatewayAuthorizerResult } from "@codebricks/typebricks";

export async function handler(event: APIGatewayTokenAuthorizerEvent): Promise<APIGatewayAuthorizerResult> {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        const token = event.authorizationToken;
        const decoded = jwt.verify(token, String(jwtSecret));
        if (decoded) {
            return allowPolicy(String(decoded.sub));
        }
    } catch (error) {
        return denyPolicy();
    }
    return denyPolicy();
}

function denyPolicy(): APIGatewayAuthorizerResult {
    return {
        "principalId": "*",
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "*",
                    "Effect": "Deny",
                    "Resource": "*"
                }
            ]
        }
    }
}

function allowPolicy(principalId: string): APIGatewayAuthorizerResult {
    return {
        "principalId": principalId,
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Action": "execute-api:Invoke",
                    "Effect": "Allow",
                    "Resource": "*"
                }
            ]
        }
    }
}
