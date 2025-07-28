import { Des } from './_des';
import { Input } from './_input';
import { Faq } from './_faq';
import { Blog } from './_blogs';
import { Feature } from './_feature';
import { Review } from './_review';
import type { Messages, NamespaceKeys, NestedKeyOf } from 'use-intl/core';

export default async function Content({
  description,
  faqTitle,
  btnText,
  features,
  featureTitle,
  faq,
  title,
  jsonLd,
  reviewTitle,
}: Messages['home']['toMp3'] & { jsonLd: string }) {
  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ question, answer }) => {
      return {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      };
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <Des title={title} description={description} />
      <Input />
      <Faq title={faqTitle} faqs={jsonLdFaq.mainEntity} text={btnText} />
      <Blog text={btnText} />
      <Feature title={featureTitle} features={features} text={btnText} />
      <Review text={btnText} title={reviewTitle} jsonLd={jsonLd} />
    </>
  );
}
