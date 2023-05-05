import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { api } from "~/utils/api";
import { useNotification } from "~/contexts";
import { useProfilePreview } from "~/contexts/ProfilePreviewContext";
import { LinksList } from "./LinksList";
import { NewLinkForm } from "./NewLinksForm";

export const LinkScreen = () => {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const { data: session } = useSession();
  const profileId = session?.user?.profile?.id as string;
  const { data: linkData, isLoading } = api.link.byProfileId.useQuery({
    profileId,
  });
  const handle = session?.user?.profile.handle || {};
  const { showNotification } = useNotification();
  const updateLinkSortOrder = api.link.updateSortOrder.useMutation();
  const [linkState, setLinkState] = useState<Link[] | undefined>(
    linkData || [],
  );

  useEffect(() => {
    setLinkState(linkData);
  }, [linkData]);

  const onDragEnd = async (result: any) => {
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
          refreshPreview();
        },
      },
    );
  };

  return (
    <>
      <h2>Links</h2>
      <NewLinkForm profileId={profileId} linkCount={linkData?.length || 0} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided: any) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <LinksList links={linkState} />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
