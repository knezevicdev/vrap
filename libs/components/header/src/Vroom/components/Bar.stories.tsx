import { styled } from '@material-ui/core/styles';
import React from 'react';

import Bar from './Bar';

export default { title: 'Bar' };

export const byItself: React.FC = () => {
  return <Bar />;
};

export const withContent: React.FC = () => {
  return (
    <Bar>
      <p>This is a paragraph tag</p>
    </Bar>
  );
};

const ScrollableDiv = styled('div')(() => ({
  height: '200vh',
}));

export const sticky: React.FC = () => {
  return (
    <ScrollableDiv>
      <Bar>
        <p>Notice that the header bar is sticky as you scroll down</p>
      </Bar>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ornare arcu odio ut
        sem nulla. Augue lacus viverra vitae congue eu consequat. Sit amet
        consectetur adipiscing elit duis tristique sollicitudin nibh. Malesuada
        pellentesque elit eget gravida cum. Eleifend mi in nulla posuere
        sollicitudin aliquam ultrices sagittis orci. Mauris pellentesque
        pulvinar pellentesque habitant morbi tristique senectus et netus. Elit
        scelerisque mauris pellentesque pulvinar pellentesque habitant. Mattis
        enim ut tellus elementum sagittis vitae et. Ut venenatis tellus in
        metus. Auctor elit sed vulputate mi. In hac habitasse platea dictumst
        vestibulum rhoncus est pellentesque elit. Aliquam ut porttitor leo a
        diam sollicitudin. Consequat mauris nunc congue nisi vitae suscipit.
        Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus.
        Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis.
        Lacus luctus accumsan tortor posuere ac. A scelerisque purus semper eget
        duis at tellus. Feugiat nisl pretium fusce id. Cras tincidunt lobortis
        feugiat vivamus at augue eget arcu dictum. Egestas fringilla phasellus
        faucibus scelerisque eleifend donec pretium. Adipiscing enim eu turpis
        egestas pretium aenean pharetra magna. Scelerisque varius morbi enim
        nunc faucibus a pellentesque sit. Nullam vehicula ipsum a arcu cursus
        vitae. Aliquam vestibulum morbi blandit cursus risus at ultrices mi
        tempus. Lacinia quis vel eros donec ac odio tempor orci dapibus.
        Venenatis lectus magna fringilla urna. Laoreet id donec ultrices
        tincidunt arcu non. Massa id neque aliquam vestibulum morbi blandit
        cursus risus at. Consectetur adipiscing elit duis tristique. Purus non
        enim praesent elementum facilisis leo vel fringilla. Platea dictumst
        vestibulum rhoncus est pellentesque elit ullamcorper. Dictumst
        vestibulum rhoncus est pellentesque elit. Sagittis vitae et leo duis ut
        diam. Odio ut enim blandit volutpat maecenas volutpat. Ut diam quam
        nulla porttitor massa id neque aliquam vestibulum. Tincidunt nunc
        pulvinar sapien et ligula. Eget mauris pharetra et ultrices. Nibh cras
        pulvinar mattis nunc sed. Massa vitae tortor condimentum lacinia quis
        vel eros donec. Interdum velit laoreet id donec. Metus vulputate eu
        scelerisque felis. Ullamcorper morbi tincidunt ornare massa eget egestas
        purus viverra accumsan. Sed euismod nisi porta lorem mollis aliquam ut
        porttitor leo. Mauris vitae ultricies leo integer malesuada nunc vel
        risus. Elementum pulvinar etiam non quam lacus suspendisse faucibus
        interdum posuere. Erat pellentesque adipiscing commodo elit. Adipiscing
        elit ut aliquam purus sit amet luctus venenatis. Vel quam elementum
        pulvinar etiam non quam lacus suspendisse faucibus. Tortor at risus
        viverra adipiscing at in tellus integer feugiat. Dolor magna eget est
        lorem ipsum dolor sit amet consectetur. Integer feugiat scelerisque
        varius morbi enim nunc faucibus a. Odio morbi quis commodo odio aenean.
        Risus in hendrerit gravida rutrum quisque. Purus sit amet volutpat
        consequat mauris nunc congue. Massa vitae tortor condimentum lacinia
        quis vel. Nulla posuere sollicitudin aliquam ultrices sagittis orci.
        Eget mauris pharetra et ultrices neque. Sem integer vitae justo eget.
        Eget aliquet nibh praesent tristique magna sit amet. Nunc sed id semper
        risus in hendrerit. Sit amet est placerat in egestas erat imperdiet sed.
        Egestas fringilla phasellus faucibus scelerisque eleifend. Dictumst
        quisque sagittis purus sit. At quis risus sed vulputate odio ut enim.
        Dictum at tempor commodo ullamcorper a lacus vestibulum. In metus
        vulputate eu scelerisque felis imperdiet proin fermentum leo. Turpis
        tincidunt id aliquet risus feugiat in. Pellentesque dignissim enim sit
        amet venenatis urna cursus eget. Consequat interdum varius sit amet
        mattis. Ut enim blandit volutpat maecenas volutpat blandit aliquam
        etiam. Sollicitudin tempor id eu nisl nunc mi ipsum. Mattis molestie a
        iaculis at erat pellentesque adipiscing commodo. A lacus vestibulum sed
        arcu non. Ipsum suspendisse ultrices gravida dictum fusce ut.
        Suspendisse faucibus interdum posuere lorem ipsum dolor. Accumsan sit
        amet nulla facilisi morbi tempus iaculis. Enim neque volutpat ac
        tincidunt vitae. Suspendisse sed nisi lacus sed viverra tellus in hac.
        Elementum tempus egestas sed sed risus. Feugiat sed lectus vestibulum
        mattis ullamcorper velit sed ullamcorper. Lectus urna duis convallis
        convallis tellus id. Sed blandit libero volutpat sed. Convallis posuere
        morbi leo urna molestie at elementum. Quis lectus nulla at volutpat diam
        ut venenatis tellus in. Vulputate mi sit amet mauris commodo quis
        imperdiet. Enim tortor at auctor urna nunc id cursus metus. Vitae congue
        eu consequat ac felis donec. Est sit amet facilisis magna etiam tempor.
        Netus et malesuada fames ac turpis egestas maecenas. Faucibus in ornare
        quam viverra orci sagittis eu volutpat. Nulla porttitor massa id neque
        aliquam. Nunc non blandit massa enim nec. Sed euismod nisi porta lorem
        mollis aliquam. Sed viverra ipsum nunc aliquet bibendum enim facilisis
        gravida. At auctor urna nunc id cursus metus aliquam eleifend mi.
        Venenatis cras sed felis eget velit aliquet sagittis. Feugiat vivamus at
        augue eget arcu dictum varius. Arcu ac tortor dignissim convallis aenean
        et. Arcu non sodales neque sodales ut etiam. Pharetra convallis posuere
        morbi leo urna molestie at elementum eu. Sed elementum tempus egestas
        sed. Risus viverra adipiscing at in tellus integer feugiat scelerisque
        varius. Nulla facilisi cras fermentum odio eu feugiat pretium nibh
        ipsum. Accumsan in nisl nisi scelerisque. Nisl purus in mollis nunc sed
        id semper. Ante in nibh mauris cursus mattis molestie a. Libero id
        faucibus nisl tincidunt eget nullam non nisi est. Cras sed felis eget
        velit aliquet sagittis. Augue mauris augue neque gravida. Vulputate
        dignissim suspendisse in est ante in nibh mauris cursus. Et malesuada
        fames ac turpis egestas sed tempus. Facilisi cras fermentum odio eu
        feugiat. Tortor at risus viverra adipiscing at in tellus integer
        feugiat. Lectus quam id leo in vitae turpis massa. Felis bibendum ut
        tristique et egestas quis ipsum. Nulla at volutpat diam ut venenatis
        tellus in metus. Hac habitasse platea dictumst quisque sagittis purus.
        Dolor sit amet consectetur adipiscing elit ut aliquam purus sit. Nisl
        purus in mollis nunc. Adipiscing diam donec adipiscing tristique risus
        nec feugiat. Elit ullamcorper dignissim cras tincidunt lobortis feugiat.
        Tellus cras adipiscing enim eu turpis egestas pretium aenean pharetra.
        Purus viverra accumsan in nisl nisi. Turpis egestas pretium aenean
        pharetra. Integer feugiat scelerisque varius morbi enim. Bibendum arcu
        vitae elementum curabitur vitae nunc sed velit dignissim. Ullamcorper
        sit amet risus nullam eget felis eget nunc lobortis. Praesent elementum
        facilisis leo vel fringilla est. Arcu ac tortor dignissim convallis
        aenean et tortor. Adipiscing elit ut aliquam purus sit amet luctus. Dui
        faucibus in ornare quam viverra. Turpis egestas sed tempus urna et.
        Iaculis nunc sed augue lacus viverra vitae. Tortor condimentum lacinia
        quis vel eros donec ac odio. Venenatis urna cursus eget nunc scelerisque
        viverra mauris in. Tristique senectus et netus et malesuada fames ac
        turpis egestas. Risus ultricies tristique nulla aliquet enim tortor at
        auctor urna. Cursus in hac habitasse platea dictumst quisque.
      </p>
    </ScrollableDiv>
  );
};
