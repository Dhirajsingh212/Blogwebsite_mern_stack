import React from "react";

const Comments = () => {
  return (
    <div>
      <p className="text-2xl font-bold text-rose-600 border-b-4 border-rose-600">
        Comments
      </p>
      <div className="flex flex-col py-6">
        {[1, 2, 3, 4].map((e) => {
          return (
            <div
              key={e}
              className="py-5 lg:py-10 flex flex-row gap-4 items-center border-b-2 border-gray-800"
            >
              <div>
                <img
                  className="hidden lg:flex self-start rounded-full h-20 w-20"
                  src="https://st.depositphotos.com/68330470/57442/i/450/depositphotos_574424718-stock-photo-car-driving-road-side-view.jpg"
                />
              </div>
              <div className="w-full self-center flex flex-col gap-4">
                <p className="text-lg">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel
                  facere accusamus temporibus ullam consectetur eveniet quam,
                  architecto tempore, atque asperiores blanditiis quis numquam
                  provident quidem ab repudiandae repellat odit? Obcaecati
                  provident recusandae quidem, illo possimus non aut, laudantium
                  et officia adipisci quaerat laboriosam ea exercitationem odio
                  neque consequuntur atque vitae eligendi voluptates, facere
                  totam blanditiis itaque voluptas. Ducimus fuga magni eum
                  dolores asperiores id sunt perspiciatis quibusdam, nulla
                  doloremque, expedita voluptatibus ad facere hic quod et cumque
                  neque maiores voluptates repudiandae voluptatum maxime nihil
                  quasi illo. Exercitationem, eveniet repellat iste distinctio
                  porro, totam temporibus assumenda molestias, maxime in eius
                  veniam!
                </p>
                <div className="self-center flex flex-row gap-2 cursor-pointer text-xl">
                  <i class="fa-regular fa-heart"></i>
                  <i class="fa-solid fa-comment"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
