interface Media {
  webp: string;
  jp2: string;
}

class PictureViewModel {
  src = '';
  className?: string;

  constructor(filePath: string, className?: string) {
    this.src = filePath;
    if (className) {
      this.className = className;
    }
  }

  get(): Media {
    const exploded = this.src.split('/');
    const path = exploded.slice(0, exploded.length - 1).join('/');
    const file = exploded[exploded.length - 1];
    const fileName = ((arr): string => arr.slice(0, arr.length - 1).join('.'))(
      file.split('.')
    );
    return {
      webp: `${path}/webp/${fileName}.webp`,
      jp2: `${path}/jp2/${fileName}.jp2`,
    };
  }
}

export default PictureViewModel;