import { type FastifyInstance } from "fastify";

async function eventsRoutes(app: FastifyInstance): Promise<any> {
  const eventsMock = [
    {
      id: "752aeea9-0859-4128-ac49-14eda92b0276",
      active: true,
      image:
        "586bc3d74566e1d9cf6096acb592905f-513d7a0ab11e38f7bd117d760146fed3_esfiha_imigrantes.jpg",
      title: "Esfiha Imigrantes",
      address:
        "Av. Dr. Ricardo Jafet, 3332 - Vila Gumercindo, São Paulo - SP, 04260-020",
      description: [
        'Eleita entre as melhores esfihas de São Paulo e com pontuação máxima na pesquisa "Você é o crítico", do Guia da Folha, em que consumidores avaliaram comida, ambiente, serviços e atendimento, a Esfiha Imigrantes, uma casa simples, consolidou-se como referência em comida árabe na cidade',
        "Chegou a hora de conhecer mais este local com a melhor companhia! Junte-se conosco nesta noite de sábado!",
      ],
      startDate: "2023-04-29T22:00:00.000Z",
      endDate: "2023-04-30T00:00:00.000Z",
      latitude: "-23.60374719010013",
      longitude: "-46.62603453578621",
    },
    {
      id: "9fefe65e-b4ac-4ec7-8b19-1f17069f84f1",
      active: false,
      image:
        "586bc3d74566e1d9cf6096acb592905f-513d7a0ab11e38f7bd117d760146fed3_esfiha_imigrantes.jpg",
      title: "Hopi Hari",
      address:
        "Av. Dr. Ricardo Jafet, 3332 - Vila Gumercindo, São Paulo - SP, 04260-020",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget sapien sed lectus imperdiet vehicula quis vitae risus. Donec at dui pretium, vehicula quam nec, tristique leo. Nam egestas tellus orci, non commodo urna imperdiet nec. Sed at libero massa",
      startDate: "2023-04-29T22:00:00.000Z",
      endDate: "2023-04-30T00:00:00.000Z",
      latitude: "-23.60374719010013",
      longitude: "-46.62603453578621",
    },
  ];

  app.get("/", async (request, reply) => {
    return eventsMock;
    // return await reply.status(201).send();
  });
}

export { eventsRoutes };
