import React from 'react';
import {Link} from "react-router-dom";

export const PostContent = () => {
    return (
        <Link className="post__content" to="">

            <div className="description__container">
                {/*title, description*/}
                <div className="spacer">
                    <h2 className="post__title">
                        Snusovaya lihoradka
                    </h2>
                </div>
                <div className="spacer">
                    <p className="post__description">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, assumenda dolor in optio
                        repellat rerum suscipit. Commodi harum iste provident reiciendis sed tenetur, voluptate! A aut
                        cupiditate eius nam officiis.Accusamus consequatur fugiat ipsam molestias nulla obcaecati
                        officiis quam quasi quod reprehenderit. Amet aperiam dicta dolor ex illo maiores minima mollitia
                        neque nihil nobis odio, praesentium rem sed similique velit. Accusamus aut beatae, commodi
                        consequatur debitis deleniti dicta dignissimos eos exercitationem hic incidunt inventore,
                        laudantium magnam nam nesciunt nulla pariatur quae quasi quia quibusdam, ratione rem
                        reprehenderit repudiandae vero voluptatem? Culpa debitis ex itaque nam nostrum officiis pariatur
                        quos. Alias aliquam amet aspernatur aut cum distinctio earum eveniet libero magni natus nemo,
                        obcaecati quae, quam recusandae, reprehenderit vel voluptatum. Ipsum. Architecto at distinctio
                        dolor ducimus eos est exercitationem, explicabo fugit impedit itaque nam numquam officia quasi
                        quod repellendus sequi velit! Amet atque consequuntur delectus distinctio ea, harum incidunt
                        maxime veritatis
                    </p>
                </div>
            </div>
        </Link>
    );
};
