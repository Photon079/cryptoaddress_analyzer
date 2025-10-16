import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler.js';

// Address validation patterns
const ETHEREUM_ADDRESS_PATTERN = /^0x[a-fA-F0-9]{40}$/;
const BITCOIN_ADDRESS_PATTERN = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      throw new AppError(errorMessage, 400);
    }

    req.body = value;
    next();
  };
};

export const validateQueryParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message)
        .join(', ');
      
      throw new AppError(errorMessage, 400);
    }

    req.query = value;
    next();
  };
};

// Common validation schemas
export const addressAnalysisSchema = Joi.object({
  address: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!ETHEREUM_ADDRESS_PATTERN.test(value) && !BITCOIN_ADDRESS_PATTERN.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .messages({
      'any.invalid': 'Invalid cryptocurrency address format',
      'any.required': 'Address is required'
    }),
  blockchain: Joi.string()
    .valid('ethereum', 'bitcoin')
    .optional()
});

export const ethereumAddressSchema = Joi.object({
  address: Joi.string()
    .pattern(ETHEREUM_ADDRESS_PATTERN)
    .required()
    .messages({
      'string.pattern.base': 'Invalid Ethereum address format',
      'any.required': 'Ethereum address is required'
    })
});

export const bitcoinAddressSchema = Joi.object({
  address: Joi.string()
    .pattern(BITCOIN_ADDRESS_PATTERN)
    .required()
    .messages({
      'string.pattern.base': 'Invalid Bitcoin address format',
      'any.required': 'Bitcoin address is required'
    })
});

export const saveAddressSchema = Joi.object({
  address: Joi.string().required(),
  label: Joi.string().max(100).optional(),
  tags: Joi.array().items(Joi.string().max(50)).max(10).optional(),
  blockchain: Joi.string().valid('ethereum', 'bitcoin', 'other').required(),
  notes: Joi.string().max(500).optional()
});
