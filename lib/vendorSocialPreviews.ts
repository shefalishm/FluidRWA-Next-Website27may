import categories from '@/data/vendor-social-previews.json';

export function vendorSocialPreview(canonicalPath: string) {
  let slug = canonicalPath.replace(/^\/vendors\//, '').replace(/^\//, '').replace(/\/$/, '');
  if (['vendors', 'vendor-ecosystem'].includes(slug)) slug = 'web3vendorecosystem';
  const label = (categories as Record<string, string[]>)[slug];
  if (!label) return undefined;
  return {
    image: `/assets/social/vendor-categories/${slug}-glass-v1.jpg`,
    alt: `FluidRWA: ${label.join(' ')}. Professional glass architecture category cover.`
  };
}
