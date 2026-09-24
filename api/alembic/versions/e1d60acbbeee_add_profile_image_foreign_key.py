"""add profile image foreign key

Revision ID: e1d60acbbeee
Revises: 8d4109d474a3
Create Date: 2026-09-24 10:02:07.647539

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e1d60acbbeee'
down_revision: Union[str, Sequence[str], None] = '8d4109d474a3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_foreign_key(
        "fk_profile_image_id_images",
        "profile",
        "images",
        ["image_id"],
        ["id"],
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(
        "fk_profile_image_id_images",
        "profile",
        type_="foreignkey",
    )