import React from 'react';
import { find } from 'lodash';

import { LinkModal } from '../../hooks/modal';
import { MediaRoute } from '../../constants';

import '../../styles/components/crime/CrimeModule.scss';


const CrimeModule = ({ module, documents }) => {

  const image = find(documents, ['document_id', module.id]);

  if(module.module !== 'object' && module.module !== 'text')
    console.log(`Unsupported module type: ${module.module}`);

  return (
    <div className="CrimeModule">
      {image &&
        <LinkModal
          to      = {`../../${MediaRoute.to}/${image.slug}`}
          state   = {{darkMode: true}}
          useBackground
        >
          <img src={image.data.resolutions?.medium.url} alt={image.data.title} />
        </LinkModal>
      }
      {module?.text?.content}
    </div>
  );
};

export default CrimeModule;
