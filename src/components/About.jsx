import React from 'react'

const About = () => {
    // const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768)
    // if(isMobile) {
    //      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
    //         <h1>Our Journey</h1>
    //         <hr/>
    //     <div className="grid grid-cols-1">
    //         <div className="border rounded-xl border-blue-400">
    //             <h1>🌱</h1>
    //             <p>2022</p>
    //             <p>Founded with a simple mission to revolutionize online shopping</p>
    //         </div>
    //         <div className="border rounded-xl border-blue-400">
    //             <h1>🚀</h1>
    //             <p>2023</p>
    //             <p>Launched express delivery and expanded our product catalog</p>
    //         </div>
    //         <div className="border rounded-xl border-blue-400">
    //             <h1>🏆</h1>
    //             <p>2024</p>
    //             <p>FServing 50,000+ happy customers worldwide with excellence</p>
    //         </div>
    //     </div>
        
    //     <section className="container">
    //         <h1>Our Core Values</h1>
    //         <hr />
    //         <div className="grid grid-cols-2">
    //             <div className="bg-gradient-to-r from-purple-500 to-indigo-600">
    //                 <h1>🤝</h1>
    //                 <p className="font-bold">Trust</p>
    //                 <p>We earn your trust through consistent quality and reliable service</p>
    //             </div>
    //             <div className="bg-gradient-to-r from-purple-500 to-indigo-600">
    //                 <h1>💡</h1>
    //                 <p className="font-bold">Innovation</p>
    //                 <p>We continuously improve our platform and services</p>
    //             </div>
    //             <div className="bg-gradient-to-r from-purple-500 to-indigo-600">
    //                 <h1>✨</h1>
    //                 <p className="font-bold">Integrity</p>
    //                 <p>We're honest, transparent, and fair in all our dealings</p>
    //             </div>
    //             <div className="bg-gradient-to-r from-purple-500 to-indigo-600">
    //                 <h1>🎯</h1>
    //                 <p className="font-bold">Excellence</p>
    //                 <p>We strive for perfection in everything we do</p>
    //             </div>
    //         </div>

    //     </section>
    //     </div>
    // }
  return (
    <>
    <section className="text-center my-4">
        <h1 className="text-xl md:text-3xl font-bold">About Shop<span className="text-green-600">Ez</span></h1>
        <p className="text-xs md:text-base">Your Trusted Shopping Partner Since 2022</p>
    </section>
    <section className="m-6 ">
            <div>
                <h1 className="text-xl md:text-3xl font-bold text-center">Our Journey</h1>
                <hr className="w-24 m-auto border"/>
            </div>
        <div className="grid grid-col-1 md:grid-cols-2 gap-4 my-4 md:my-6 mx-auto items-center">
            <div className="border rounded-xl border-blue-400 p-4">
                <h1 className="text-2xl md:text-4xl">🌱</h1>
                <p className="font-bold text-base md:text-xl">Our Story</p>
                <p className="text-xs md:text-base">
                    Founded in 2020 with a simple mission: to make 
                    online shopping effortless, reliable, and enjoyable for everyone. 
                    What started as a small team of passionate entrepreneurs has 
                    grown into a trusted e-commerce platform serving thousands 
                    of happy customers worldwide.
                </p>
            </div>
            <div className="border rounded-xl border-blue-400 p-4">
                <h1 className="text-2xl md:text-4xl">🤝</h1>
                <p className="font-bold font-base md:text-xl">Who We Are</p>
                <p className="text-xs md:text-base">
                    We're more than just an online store - we're your shopping 
                    companions who understand that every purchase matters. 
                    Our team of dedicated professionals works tirelessly 
                    to curate the best products, negotiate 
                    the best prices, and deliver exceptional service that exceeds 
                    your expectations.
                </p>
            </div>
            <div className="border rounded-xl border-blue-400 p-4">
                <h1 className="text-2xl md:text-4xl">🚀</h1>
                <p className="font-bold font-base md:text-xl">Our Mission</p>
                <p className="text-xs md:text-base">
                    To revolutionize online shopping by making quality products accessible to everyone, 
                    while providing an unmatched customer experience that builds lasting relationships.
                    When you shop with us, you're not just a customer - you're part of the ShopEz family. 
                    We value your feedback, celebrate your milestones, and continuously work to 
                    make your shopping experience better.
                </p>
            </div>
            <div className="border rounded-xl border-blue-400 p-4">
                <h1 className="text-2xl md:text-4xl">🏆</h1>
                <p className="font-bold font-base md:text-xl">Our Values</p>
                <p className="text-xs md:text-base">
                    <span className="font-bold">Trust </span>- We earn your trust through consistent quality and reliable service<br />
                    <span className="font-bold">Innovation</span> - We continuously improve our platform and services<br />
                    <span className="font-bold">Integrity</span> - We're honest, transparent, and fair in all our dealings<br />
                    <span className="font-bold">Excellence</span> - We strive for perfection in everything we do<br />
                    <span className="font-bold">Community</span> - We believe in building lasting relationships with our customers
                </p>
            </div>
        </div>
    </section>
    <section className="m-6">
        <h1 className="text-xl md:text-3xl font-bold text-center">Our Core Values</h1>
        <hr className="w-24 m-auto border"/>
        <div className="grid grid-col-1 md:grid-cols-2 gap-4 items-center my-4">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white rounded-lg">
                <h1 className="text-2xl md:text-4xl">🤝</h1>
                <p className="font-bold">Quality First Approach</p>
                <p className="text-sm md:text-base">
                    Every product in our catalog goes through rigorous quality checks. We partner 
                    only with trusted suppliers and brands that share our commitment to excellence.
                </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 text-white rounded-lg">
                <h1 className="text-2xl md:text-4xl">⚡️</h1>
                <p className="font-bold">Lightning-Fast Delivery</p>
                <p className="text-sm md:text-base">
                    Our advanced logistics network ensures your orders reach you within 24-48 hours. 
                    We've invested heavily in technology and partnerships to make this possible.
                </p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white rounded-lg">
                <h1 className="text-2xl md:text-4xl">🔒</h1>
                <p className="font-bold">Your Security, Our Priority</p>
                <p className="text-sm md:text-base">
                    We use bank-grade encryption and secure payment gateways. Your personal 
                    information and transactions are protected with the highest security standards.
                </p>
            </div>
            <div className="bg-gradient-to-r from-indigo-600 to-purple-500 p-4 text-white rounded-lg">
                <h1 className="text-2xl md:text-4xl">💰</h1>
                <p className="font-bold">Transparent Pricing</p>
                <p className="text-sm md:text-base">
                    No hidden fees, no surprise charges. 
                    What you see is what you pay. 
                    Plus, we offer price-match guarantees and exclusive member discounts.
                </p>
            </div>
        </div>

    </section>
    </>
  )
}

export default About