import { useEffect, useState } from "react";
import { Container } from "@facets/ui";
import { useSession } from "next-auth/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { LinksList } from "~/components/links/LinksList";
import { NewLinkForm } from "~/components/links/NewLinksForm";
import { useNotification } from "~/contexts/NotificationsContext";

export default function DashboardLink() {
  const utils = api.useContext();
  const { data: session } = useSession();
  const profileId = session?.user?.profile?.id as string;
  const { data: linkData, isLoading } = api.link.byProfileId.useQuery({
    profileId,
  });
  const { showNotification } = useNotification();
  const updateLinkSortOrder = api.link.updateSortOrder.useMutation();
  const [linkState, setLinkState] = useState(linkData || []);

  useEffect(() => {
    setLinkState(linkData);
  }, [linkData]);

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const nextLinkData = [...linkData];
    const [reorderedLink] = nextLinkData.splice(result.source.index, 1);
    nextLinkData.splice(result.destination.index, 0, reorderedLink);

    const linksToPersist = nextLinkData.map((link, index) => {
      link.sortOrder = index;
      return link;
    });

    setLinkState(linksToPersist);
    await updateLinkSortOrder.mutateAsync(
      {
        profileId,
        links: linksToPersist.map((link) => {
          return { id: link.id, sortOrder: link.sortOrder };
        }),
      },
      {
        onSuccess: () => {
          showNotification({ message: "Link order updated" });
          utils.link.byProfileId.invalidate();
        },
      },
    );
  };

  return (
    <Layout pageTitle="Links">
      <Container
        css={{
          maxWidth: "800px",
          px: "1rem",
        }}
      >
        <h2>Links</h2>
        <NewLinkForm profileId={profileId} linkCount={linkData?.length || 0} />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <LinksList links={linkState} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </Layout>
  );
}
