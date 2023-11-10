import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeVideo: snippetCode = {
  html: `
  <!-- plyr video -->
  <div plyr plyrTitle="Video" [plyrPlaysInline]="true"  [plyrPoster]="poster" [plyrSources]="videoSources" [plyrTracks]="tracks" [plyrOptions]="plyrOptions"></div>
  <!--/ plyr video -->
  `,
  ts: `
  // get the component instance to have access to plyr instance
  @ViewChild(PlyrComponent)

  // or get it from plyrInit event
  public plyr: PlyrComponent;
  public player: Plyr;
  public plyrOptions = { tooltips: { controls: true } };

  // video Sources
  public videoSources: Plyr.Source[] = [
    {
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
      type: 'video/mp4',
      size: 576
    },
    {
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4',
      type: 'video/mp4',
      size: 720
    },
    {
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4',
      type: 'video/mp4',
      size: 1080
    },
    {
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1440p.mp4',
      type: 'video/mp4',
      size: 1440
    }
  ];

  public tracks = [
    {
      kind: 'captions',
      label: 'English',
      srclang: 'en',
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt',
      default: true
    },
    {
      kind: 'captions',
      label: 'French',
      srclang: 'fr',
      src:
        'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.fr.vtt'
    }
  ];

  public poster =
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg';
  `
};
export const snippetCodeAudio: snippetCode = {
  html: `
  <!-- plyr audio -->
  <div plyr plyrTitle="Audio" plyrType="audio" [plyrSources]="audioSources"></div>
  <!--/ plyr audio -->
  `,
  ts: `
  // audio source
  public audioSources = [
    {
      src:
        'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3',
      type: 'audio/mp3'
    },
    {
      src:
        'https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.ogg',
      type: 'audio/ogg'
    }
  ];
  `
};
