// Intrinsic size travels with each photo: next/image needs it, and they will
// not all have come off the same camera.
export type CatPhoto = {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export const catPhotos: readonly CatPhoto[] = [
  {
    src: '/tater-beans-mcgee.jpg',
    alt: 'Tater Beans McGee sprawled upside down on a bed, unimpressed',
    width: 768,
    height: 644,
  },
  {
    src: '/tater-beans-mcgee-2.jpg',
    alt: 'Tater Beans McGee stretched along the back of a couch in front of a window, one leg fully extended',
    width: 768,
    height: 576,
  },
  {
    src: '/tater-beans-mcgee-3.jpg',
    alt: 'Tater Beans McGee looking up from a lap, a laptop open on the desk behind her',
    width: 768,
    height: 681,
  },
  {
    src: '/tater-beans-mcgee-4.jpg',
    alt: 'Tater Beans McGee lying on her side, chin up, caught mid blep',
    width: 768,
    height: 535,
  },
  {
    src: '/tater-beans-mcgee-5.jpg',
    alt: 'Tater Beans McGee curled into a loaf on a bed, looking off to one side',
    width: 768,
    height: 548,
  },
  {
    src: '/tater-beans-mcgee-6.jpg',
    alt: 'Tater Beans McGee lying face to face with Sam, one paw on her cheek',
    width: 768,
    height: 664,
  },
  {
    src: '/tater-beans-mcgee-7.jpg',
    alt: 'Tater Beans McGee very close to the camera, both eyes wide',
    width: 768,
    height: 835,
  },
  {
    src: '/tater-beans-mcgee-8.jpg',
    alt: 'Tater Beans McGee perched on a chair, one paw over the edge, mid stare',
    width: 768,
    height: 576,
  },
]
