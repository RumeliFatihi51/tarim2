import type {PageId} from './content/site';
import {Layout} from './layout/Layout';
import {Home} from './pages/Home';
import {Platform} from './pages/Platform';
import {Technology} from './pages/Technology';
import {Filiz} from './pages/Filiz';
import {Solutions,About,Contact,Legal,Credits,NotFound} from './pages/Editorial';
export function App({page='home',base='/'}:{page?:PageId;base?:string}){const pages={home:<Home base={base}/>,platform:<Platform base={base}/>,teknoloji:<Technology base={base}/>,filiz:<Filiz base={base}/>,cozumler:<Solutions base={base}/>,hakkimizda:<About base={base}/>,iletisim:<Contact base={base}/>,gizlilik:<Legal base={base} type="privacy"/>,kullanim:<Legal base={base} type="terms"/>,'gorsel-kredileri':<Credits base={base}/>, '404':<NotFound base={base}/>};return <Layout page={page} base={base}>{pages[page]||pages['404']}</Layout>}
