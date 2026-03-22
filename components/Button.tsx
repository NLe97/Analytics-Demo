'use client';

import type React from 'react';
import Link from 'next/link';
import { useNinetailed } from '@ninetailed/experience.js-next';
import type { ButtonClient } from '../@types/customTypes';

import { toInternalHref } from '../lib/links';

export interface ButtonProps {
  as?: React.ElementType | typeof Link;
  id: ButtonClient['sys']['id'];
  eventName?: ButtonClient['fields']['eventName'];
  eventPayload?: ButtonClient['fields']['eventPayload'];
  text: ButtonClient['fields']['buttonText'];
  variant?: ButtonClient['fields']['variant'];
  slug: ButtonClient['fields']['slug'];
}

export const Button = ({ sys, fields, ...rest }: ButtonClient) => {
  const { track, identify } = useNinetailed();
  const { eventName, eventType, eventPayload } = fields;

  const generateRandomValue = (key: string, value: string): string | number => {
    if (value === '{{random_amount}}') {
      // Generate random amount between 50 and 500
      return Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    }

    if (value === '{{random_timestamp}}') {
      // Generate random timestamp within the last 30 days
      const now = Date.now();
      const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);
      return Math.floor(Math.random() * (now - thirtyDaysAgo) + thirtyDaysAgo);
    }

    if (value === '{{random_duration}}') {
      // Generate random duration between 5 and 120 minutes
      return Math.floor(Math.random() * (120 - 5 + 1)) + 5;
    }

    return value;
  };

  const processPayload = (payload: Record<string, any>): Record<string, any> => {
    const processed: Record<string, any> = {};
    for (const [key, value] of Object.entries(payload)) {
      if (typeof value === 'string') {
        processed[key] = generateRandomValue(key, value);
      } else {
        processed[key] = value;
      }
    }
    return processed;
  };

  const trackButtonClick = async () => {
    switch (eventType) {
      case 'track':
        if (eventName) {
          const processedPayload = eventPayload 
            ? processPayload(eventPayload as Record<string, any>)
            : {};
          
          await track(
            eventName,
            processedPayload as Record<
              PropertyKey,
              string | number | (string | number)[]
            >
          );
          const payloadString = JSON.stringify(processedPayload, null, 2);
          console.log(
            'Sent Ninetailed track event with event name %s and properties:',
            eventName,
            payloadString
          );
        } else {
          console.log('No event name provided, skipped track call');
        }
        break;
      case 'identify':
        await identify(
          eventName ?? '',
          (eventPayload as Record<
            PropertyKey,
            string | number | (string | number)[]
          >) ?? {}
        );
        {
          const payloadString = JSON.stringify(eventPayload, null, 2);
          if (eventName) {
            console.log(
              'Sent Ninetailed identify event with userId %s and traits:',
              eventName,
              payloadString
            );
          } else {
            console.log(
              'Sent Ninetailed identify event with no userId and traits:',
              payloadString
            );
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <Link
      key={sys.id}
      href={toInternalHref(fields.slug)}
      onClick={() => {
        void trackButtonClick();
      }}
      {...rest}
    >
      {fields.buttonText || 'Learn More'}
    </Link>
  );
};
