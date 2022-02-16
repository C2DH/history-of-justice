//  Convert language to field format used by miller (ex: fr-FR to fr_FR)
export const lang2Field = l => l?.split('-').join('_');
