import Layout from '../components/Layout'

import Link from 'next/link'
import { db } from '../firebase'
import { useState, useEffect } from 'react'
export default function Home({ allblogs }) {
  // console.log(allblogs)
  const [blogs, setblogs] = useState(allblogs)
  const [end, setEnd] = useState(false)
  const loadMore = async () => {
    const last = blogs[blogs.length - 1]
    const res = await db.collection('blogs')
      .orderBy('createdAt', 'desc')
      .startAfter(new Date(last.createdAt))
      .limit(3)
      .get()
    const newblogs = res.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toMillis(),
        id: docSnap.id
      }
    })
    setblogs(blogs.concat(newblogs))

    if (newblogs.length < 3) {
      setEnd(true)
    }
  }
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrolled = window.scrollY;
  //     const parallaxElement = document.querySelector('.hero');
  //     const speedFactor = 0.5;
  //     if (parallaxElement) {
  //       parallaxElement.style.backgroundPositionY = -((scrolled * speedFactor) + 180) + 'px';
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  useEffect(() => {
    let rafId;
    const parallaxElement = document.querySelector('.hero');
    const speedFactor = 0.5;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (parallaxElement) {
          const yOffset = scrolled * speedFactor;
          parallaxElement.style.backgroundPositionY = `-${yOffset + 135}px`;
        }
      });
    };

    // Set initial background position
    if (parallaxElement) {
      parallaxElement.style.backgroundPositionY = '-135px';
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
  return (
    <>
      <Layout>
        <div className="hero">
          <div className="mid-inner">
            <h1>Welcome to BlogFreakk</h1>
            <h5>Read blogs and write yourself one!</h5>
          </div>
        </div>
        <div className="blog">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-8 col-12  mx-auto " >
                {
                  blogs?.map((val, ind) => {
                    return (
                      <>


                        <div className="card mb-5" key={ind}>
                          <img
                            src={val.imageUrl}
                            alt={val.title}
                            className="bimg"

                          />
                          {/* <Image
                          src={val.imageUrl}
                          alt={val.title}
                          width={100}
                          height={300}
                        /> */}

                          <div className="p-2">
                            <h3>{val.title}</h3>
                            <p>{val.desc}</p>
                            <div className="text-center">
                              <Link href={`/blog/${val.id}`}><a className="btn btn-success"> Read More </a></Link>
                            </div>
                          </div>

                        </div>

                      </>
                    )
                  })
                }
              </div>
            </div>

            <div className="text-center">
              {
                end ? <h5 className="text-center">No Data</h5>
                  : <button className="btn btn-dark load" onClick={loadMore}>Load More</button>
              }
            </div>


          </div>
        </div>

      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await db.collection('blogs').orderBy('createdAt', 'desc').limit(3).get()




  const allblogs = res.docs.map(snap => {
    return {
      ...snap.data(),
      createdAt: snap.data().createdAt.toMillis(),
      id: snap.id
    }
  })

  return {
    props: {
      allblogs
    }
  }


}