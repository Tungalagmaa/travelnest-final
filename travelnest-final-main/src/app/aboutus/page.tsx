import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div>
            <section className="px-[10%] py-[50px]">
                {/* Section 1 */}
                <div className="flex flex-wrap items-center justify-between mb-[60px] gap-[30px]">
                    <div className="flex-1 min-w-[300px]">
                        <img src="/picture-source/image 23.png" alt="Create your trip" className="w-full h-auto rounded-[10px]" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <h2 className="text-5xl font-bold text-blue-500">welcome to Mongilia</h2>

                        <p className="text-3xl mb-2.5 text-[#333]">Welcome to TravelNest, your gateway to discovering the captivating landscapes, rich cultural heritage, and one-of-a-kind adventures that Mongolia has to offer.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">Established in 2000, Visit Mongolia has been a leader in providing exceptional and personalized travel experiences for travelers from around the world.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">With over two decades of experience, we pride ourselves on delivering tours that are tailored to meet the diverse interests and preferences of our clients.</p>
                    </div>
                </div>

                {/* Section 2 */}
                <div className="flex flex-wrap md:flex-row-reverse items-center justify-between mb-[60px] gap-[30px]">
                    <div className="flex-1 min-w-[300px]">
                        <img src="/picture-source/image 24 - Copy.png" alt="Discover trips" className="w-full h-auto rounded-[10px]" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <h2 className="text-[150px] mb-5 text-[#0a1f44]">Explore our travel services</h2>
                        <p className="text-3xl mb-2.5 text-[#333]">Luxury Tours: Enjoy the best of Mongolia in comfort and style with premium accommodations and exclusive experiences.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">Short Tours: Ideal for travelers with limited time, our short tours showcase the highlights of Mongolia.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">Festivals and Cultural Events: Experience Mongolia’s vibrant festivals including Naadam and Golden Eagle Festival.</p>
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-wrap items-center justify-between mb-[60px] gap-[30px]">
                    <div className="flex-1 min-w-[300px]">
                        <img src="/picture-source/image 25.png" alt="Our support services" className="w-full h-auto rounded-[10px]" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <h2 className="text-[26px] mb-5 text-[#0a1f44]">Our Full-time Support Services</h2>
                        <p className="text-3xl mb-2.5 text-[#333]">Airport Meet and Greet Services for a smooth arrival.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">Hotel Transfers and Transportation for a seamless journey.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">Hospitality Desk and Guest Assistance to support your travel needs.</p>
                    </div>
                </div>

                {/* Section 4 */}
                <div className="flex flex-wrap md:flex-row-reverse items-center justify-between mb-[60px] gap-[30px]">
                    <div className="flex-1 min-w-[300px]">
                        <img src="/picture-source/image 26.png" alt="Our team" className="w-full h-auto rounded-[10px]" />
                    </div>
                    <div className="flex-1 min-w-[300px]">
                        <h2 className="text-[26px] mb-5 text-[#0a1f44]">Meet the TravelNest Team</h2>
                        <p className="text-3xl mb-2.5 text-[#333]">At the core of TravelNest is our dedicated team of experienced travel professionals.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">We are passionate about Mongolia and committed to providing the best possible travel experience.</p>
                        <p className="text-3xl mb-2.5 text-[#333]">We specialize in private, highly personalized tours that exceed expectations.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
